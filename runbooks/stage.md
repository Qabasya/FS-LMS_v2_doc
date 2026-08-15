# Runbook: stage-контур на Proxmox и CD из GitHub

> **Статус: черновик** (15.08.2026). Дополняет спеку [001](../specs/001-karkas-monorepo.md) §7. При постановке монорепо переезжает в `deploy/runbooks/stage.md`.
> Выполняется один раз при настройке; разделы 6–7 — эксплуатация.

## Схема

```
push в main ──► GitHub Actions (облачные раннеры)
                 ├─ CI: линтеры, типы, тесты, миграции
                 └─ build: docker-образы ──► GHCR (ghcr.io)
                                              │ публикуется только после зелёных тестов
                 deploy-job ◄─────────────────┘
                 исполняется на self-hosted раннере (LXC 125)
                      │ ssh
                      ▼
              LXC 124 · 11.11.11.24 · docker compose
              postgres · minio · mailpit · api · web
```

| Что | Где | Кто |
|---|---|---|
| Приложение | LXC **124**, `11.11.11.24` | пользователь `deploy`, каталог `/opt/fs-lms` |
| Раннер | LXC **125**, `11.11.11.25` | пользователь `runner`, только SSH-исполнитель |
| Образы | `ghcr.io/<owner>/fs-lms/{backend,frontend}` | публикует CI |
| Приложение снаружи | `http://11.11.11.24` | фронт + `/api/v1` |
| Почта stage | `http://11.11.11.24:8025` | Mailpit ловит всё, наружу не уходит |

Раннеру Docker **не нужен**: он только выполняет `ssh` к контейнеру приложения. Меньше поверхность — меньше рисков (спека 001 §7.3).

---

## 1. Контейнер приложения (LXC 124)

### 1.1. Создание — на хосте Proxmox

Шаблон подставьте свой из `pveam available --section system` (мажор — Debian 12), шлюз — ваш.

```bash
pveam update && pveam download local debian-12-standard_12.7-1_amd64.tar.zst
```

```bash
pct create 124 local:vztmpl/debian-12-standard_12.7-1_amd64.tar.zst \
  --hostname fs-lms-stage \
  --cores 4 --memory 8192 --swap 1024 \
  --rootfs local-lvm:60 \
  --net0 name=eth0,bridge=vmbr0,ip=11.11.11.24/24,gw=11.11.11.1 \
  --features nesting=1,keyctl=1 \
  --unprivileged 1 --onboot 1 --start 1
```

`nesting=1` обязателен — без него Docker внутри LXC не стартует; `keyctl=1` нужен systemd-сервисам Docker в непривилегированном контейнере.

> **Требование: Proxmox VE 9.1 или новее.** С ноября 2025 `containerd.io` ≥ 1.7.28-2 (фикс CVE-2025-52881 в runc) не запускает контейнеры внутри LXC на старых PVE: AppArmor-профиль блокирует запись sysctl, `docker run` падает с `permission denied ... net.ipv4.ip_unprivileged_port_start`. Исправлено на стороне Proxmox в PVE 9.1. На PVE ≤ 9.0: правильный путь — обновить PVE; временный — `apt install --allow-downgrades containerd.io=1.7.28-1*` + `apt-mark hold containerd.io` (долго так жить нельзя); альтернатива — QEMU-VM вместо LXC.
>
> **Осознанное решение: Docker в LXC, хотя Proxmox официально рекомендует VM.** Свой kernel в VM снимает целый класс проблем (AppArmor, overlayfs, sysctl) — история с containerd 1.7.28-2 сломала именно LXC-установки. LXC выбран за лёгкость и плотность на локальном сервере; если стенд начнёт страдать от обновлений Docker — переезд в VM не меняет ничего, кроме §1.1: шаги §1.2–1.5 и весь CD те же.

### 1.2. Базовая настройка — внутри контейнера (`pct enter 124`)

```bash
apt-get update && apt-get -y upgrade
apt-get -y install curl ca-certificates sudo
timedatectl set-timezone Europe/Moscow
```

### 1.3. Docker — официальный apt-репозиторий

```bash
install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/debian/gpg -o /etc/apt/keyrings/docker.asc
chmod a+r /etc/apt/keyrings/docker.asc
tee /etc/apt/sources.list.d/docker.sources <<EOF
Types: deb
URIs: https://download.docker.com/linux/debian
Suites: $(. /etc/os-release && echo "$VERSION_CODENAME")
Components: stable
Architectures: $(dpkg --print-architecture)
Signed-By: /etc/apt/keyrings/docker.asc
EOF
apt-get update
apt-get -y install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

Формат файла — DEB822 (`docker.sources`), как в актуальной официальной инструкции; однострочный `docker.list` из старых гайдов не заводить рядом — apt увидит дубль источника.

Проверка (обе команды обязаны отработать без ошибок):

```bash
docker run --rm hello-world
docker info | grep -A1 "Storage Driver"
```

Нормальные ответы драйвера — **`overlay2`** (классический) или **`overlayfs`** с `driver-type: io.containerd.snapshotter.v1` (containerd image store — умолчание свежего Docker Engine 29+). Тревога — только **`vfs`**: значит overlayfs недоступен (обычно ZFS-хранилище на старом стеке); лечится `apt install fuse-overlayfs` + рестарт Docker либо переносом rootfs на ext4/LVM. `vfs` оставлять нельзя — он съедает диск полными копиями слоёв.

### 1.4. Пользователь deploy

```bash
adduser --disabled-password --gecos "" deploy
usermod -aG docker deploy
mkdir -p /home/deploy/.ssh && chmod 700 /home/deploy/.ssh
touch /home/deploy/.ssh/authorized_keys && chmod 600 /home/deploy/.ssh/authorized_keys
chown -R deploy:deploy /home/deploy/.ssh
```

Публичный ключ раннера добавим в §2.3. После этого закрываем вход по паролю — drop-in-файлом, а не правкой `sshd_config`: в Debian 12 действует `Include sshd_config.d/*.conf`, и у OpenSSH выигрывает первое встреченное значение — свой drop-in надёжнее правки основного файла:

```bash
printf 'PasswordAuthentication no\n' > /etc/ssh/sshd_config.d/90-no-password.conf
systemctl restart ssh
sshd -T | grep -i passwordauthentication   # обязан ответить: passwordauthentication no
```

### 1.5. Каталог приложения и секреты

```bash
mkdir -p /opt/fs-lms && chown deploy:deploy /opt/fs-lms
```

Файл `/opt/fs-lms/.env` создаётся руками (владелец `deploy`, права `600`) и **в git не попадает никогда** (04-conventions §2.2):

```bash
cat > /opt/fs-lms/.env <<'EOF'
# stage-секреты. Шаблон и комментарии — backend/.env.example в репозитории.
APP_ENV=stage
POSTGRES_USER=fslms
POSTGRES_PASSWORD=<сгенерировать: openssl rand -hex 24>
POSTGRES_DB=fslms
MINIO_ROOT_USER=fslms
MINIO_ROOT_PASSWORD=<сгенерировать>
SECRET_KEY=<сгенерировать>
EOF
chown deploy:deploy /opt/fs-lms/.env && chmod 600 /opt/fs-lms/.env
```

`compose.stage.yml` сюда не кладём руками — его привозит каждый деплой из репозитория (§4.4): файл на сервере всегда равен файлу в `main`.

---

## 2. Контейнер раннера (LXC 125)

### 2.1. Создание — на хосте Proxmox

Docker не нужен, контейнер маленький. `nesting=1` всё равно включаем: без него systemd в непривилегированном LXC работает криво — `systemd-logind` падает в цикле (вход затягивается на десятки секунд), `timedatectl` не работает. GUI Proxmox включает nesting для непривилегированных контейнеров по умолчанию, а изоляцию он в этой конфигурации практически не ослабляет; `keyctl` здесь не нужен — он был ради Docker.

```bash
pct create 125 local:vztmpl/debian-12-standard_12.7-1_amd64.tar.zst \
  --hostname fs-lms-runner \
  --cores 2 --memory 2048 --swap 512 \
  --rootfs local-lvm:20 \
  --net0 name=eth0,bridge=vmbr0,ip=11.11.11.25/24,gw=11.11.11.1 \
  --features nesting=1 \
  --unprivileged 1 --onboot 1 --start 1
```

### 2.2. Пользователь и зависимости — внутри (`pct enter 125`)

```bash
apt-get update && apt-get -y upgrade
apt-get -y install curl ca-certificates git jq sudo openssh-client rsync
timedatectl set-timezone Europe/Moscow
adduser --disabled-password --gecos "" runner
```

### 2.3. SSH-ключ раннера → контейнеру приложения

От пользователя `runner`:

```bash
su - runner
ssh-keygen -t ed25519 -N "" -f ~/.ssh/id_ed25519 -C "stage-runner"
cat ~/.ssh/id_ed25519.pub
```

Вывод добавить в `/home/deploy/.ssh/authorized_keys` на LXC 124 (§1.4). Затем проверить и зафиксировать host key:

```bash
ssh deploy@11.11.11.24 docker ps
```

Ключ живёт **только на раннере** — в GitHub Secrets он не кладётся вовсе: секрету, которого нет в облаке, не грозит утечка через workflow.

### 2.4. Установка GitHub Actions Runner

На GitHub: **Settings → Actions → Runners → New self-hosted runner → Linux x64**. Страница показывает актуальную версию и **одноразовый регистрационный токен** — команды скачивания копируйте оттуда (версия здесь — заведомо устаревший плейсхолдер).

Шаги идут от разных пользователей, это важно: `config.sh` **отказывается** работать от root, а `installdependencies.sh`, наоборот, требует root (у пользователя `runner` нет sudo — и не надо).

От `runner` — скачать и распаковать:

```bash
su - runner
mkdir ~/actions-runner && cd ~/actions-runner
curl -o actions-runner-linux-x64.tar.gz -L \
  https://github.com/actions/runner/releases/download/v2.3XX.X/actions-runner-linux-x64-2.3XX.X.tar.gz
tar xzf actions-runner-linux-x64.tar.gz
exit
```

От root — системные зависимости (.NET-библиотеки, libicu — скрипт ставит их сам):

```bash
/home/runner/actions-runner/bin/installdependencies.sh
```

Снова от `runner` — регистрация:

```bash
su - runner
cd ~/actions-runner
./config.sh --url https://github.com/<owner>/fs-lms \
  --token <ТОКЕН_СО_СТРАНИЦЫ> \
  --name stage-runner --labels stage --unattended
exit
```

### 2.5. Запуск как systemd-сервис

Из каталога раннера, от root:

```bash
cd /home/runner/actions-runner
./svc.sh install runner
./svc.sh start
./svc.sh status
```

Проверка: в **Settings → Actions → Runners** раннер `stage-runner` в статусе **Idle** с меткой `stage`. Раннер обновляет себя сам; после ребута контейнера поднимается сервисом.

---

## 3. Настройки репозитория GitHub

Обязательные — без них правила безопасности спеки 001 §7.3 не работают:

1. **Settings → Actions → General → Approval for running fork pull request workflows from contributors** → **Require approval for all external contributors** (строжайший из трёх режимов; GitHub переименовал прежнее «outside collaborators» в «external contributors»). Публичный репозиторий: чужой PR не запускает наши workflow без ручного одобрения.
2. Там же: **Workflow permissions → Read repository contents and packages permissions** — `GITHUB_TOKEN` по умолчанию read-only; права `packages: write` объявляет только build-джоба явно (§4.3).
3. Правило ревью каждого изменения в `.github/workflows/`: деплой-workflow (§4.3) — **единственное** место с `runs-on: [self-hosted, stage]`, его триггер — только `push` в `main`; PR-джобы всегда `ubuntu-latest`; триггеры `pull_request_target`, `issue_comment`, `workflow_run` в сочетании с self-hosted **запрещены** — они запускаются без approval-гейта.

**Принятый остаточный риск.** GitHub формулирует жёстко: self-hosted раннеры «почти никогда» не стоит использовать с публичными репозиториями, и рекомендует ephemeral/JIT-раннеры. Наши меры закрывают главный сценарий (fork-PR не исполняется на раннере), но не ошибку мейнтейнера: нажать «Approve and run» на чужом PR, который добавил свой workflow с `runs-on: self-hosted`, — значит исполнить чужой код на раннере. Компенсация: на раннере нет Docker и секретов GitHub, ssh-ключ ведёт только на stage, blast radius — одноразовый стенд. Если риск перестанет устраивать — запасной вариант §8 (pull-модель) снимает этот класс целиком.
4. **Видимость образов**: после первого пуша образов зайти в **профиль → Packages → fs-lms/backend → Package settings**: связать пакет с репозиторием и выставить **Public**. Публичные образы контейнер приложения тянет без `docker login` — на сервере не хранится ни одного GitHub-токена. (Пока пакет приватный, первый `pull` упадёт с `denied` — это ожидаемо, см. §7.)
5. (Опционально) **Environments → stage** с ограничением «only `main`» — дублирует защиту декларативно.

---

## 4. Файлы CD в репозитории

Пишутся в шаге 1 каркаса (спека 001); здесь — эталон, чтобы runbook был самодостаточным.

### 4.1. `deploy/compose.stage.yml`

```yaml
name: fs-lms-stage

services:
  db:
    image: postgres:16
    env_file: .env
    environment:
      POSTGRES_USER: ${POSTGRES_USER}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
      POSTGRES_DB: ${POSTGRES_DB}
    volumes: [pgdata:/var/lib/postgresql/data]
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ${POSTGRES_USER} -d ${POSTGRES_DB}"]
      interval: 5s
      timeout: 3s
      retries: 10
    restart: unless-stopped

  minio:
    image: minio/minio:latest
    command: server /data --console-address ":9001"
    env_file: .env
    volumes: [minio:/data]
    restart: unless-stopped

  mailpit:
    image: axllent/mailpit:latest
    ports: ["8025:8025"]        # веб-интерфейс писем
    restart: unless-stopped

  api:
    image: ghcr.io/<owner>/fs-lms/backend:${IMAGE_TAG:-latest}
    env_file: .env
    depends_on:
      db: { condition: service_healthy }
    restart: unless-stopped

  web:
    image: ghcr.io/<owner>/fs-lms/frontend:${IMAGE_TAG:-latest}
    ports: ["80:80"]            # nginx: статика + proxy /api → api:8000
    depends_on: [api]
    restart: unless-stopped

volumes:
  pgdata:
  minio:
```

`worker` появится со спекой 005 (шина) — тот же образ `backend` с другой командой.

### 4.2. `deploy/stage-deploy.sh`

Исполняется **на контейнере приложения** (деплой передаёт его по ssh на stdin):

```bash
#!/usr/bin/env bash
# Деплой stage: вызов — IMAGE_TAG=sha-<...> bash stage-deploy.sh
set -euo pipefail
cd /opt/fs-lms
export IMAGE_TAG="${IMAGE_TAG:?IMAGE_TAG обязателен — деплоим только адресуемый образ}"

docker compose -f compose.stage.yml pull
docker compose -f compose.stage.yml run --rm api alembic upgrade head
docker compose -f compose.stage.yml up -d --remove-orphans

# health-гейт: деплой не считается успешным, пока приложение не ответило
for i in $(seq 1 30); do
  curl -fsS http://localhost/api/v1/health >/dev/null && { echo "health: ok (${IMAGE_TAG})"; exit 0; }
  sleep 2
done
echo "health: FAILED" >&2
docker compose -f compose.stage.yml logs --tail=100 api >&2
exit 1
```

### 4.3. `.github/workflows/deploy.yml`

```yaml
name: deploy-stage
on:
  push:
    branches: [main]
concurrency:
  group: stage          # деплои не наслаиваются
  cancel-in-progress: false

jobs:
  ci:
    uses: ./.github/workflows/ci.yml   # тот же CI, что на PR (workflow_call)

  build:
    needs: ci
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write
    steps:
      - uses: actions/checkout@v7
      - uses: docker/login-action@v4
        with:
          registry: ghcr.io
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}
      - uses: docker/metadata-action@v6
        id: meta
        with:
          images: ghcr.io/${{ github.repository }}/backend
          tags: |
            type=raw,value=latest
            type=sha            # даёт sha-<7 символов>; префикс sha- — умолчание
      - uses: docker/build-push-action@v7
        with:
          context: backend
          push: true
          tags: ${{ steps.meta.outputs.tags }}
      # аналогичная пара шагов для frontend (context: frontend)

  deploy:
    needs: build
    runs-on: [self-hosted, stage]      # единственное место с self-hosted
    steps:
      - uses: actions/checkout@v7
        with:
          sparse-checkout: deploy
      - name: Sync compose
        run: rsync -a deploy/compose.stage.yml deploy@11.11.11.24:/opt/fs-lms/
      - name: Deploy
        # тег считается от того же github.sha теми же 7 символами, что и metadata-action:
        # git rev-parse --short здесь запрещён — его длина плавает с ростом репозитория,
        # и однажды тег деплоя молча перестанет совпадать с тегом образа
        run: |
          ssh deploy@11.11.11.24 \
            "IMAGE_TAG=sha-${GITHUB_SHA::7} bash -s" \
            < deploy/stage-deploy.sh
```

Версии actions — актуальные мажоры на 15.08.2026 (`checkout@v7`, `login-action@v4`, `metadata-action@v6`, `build-push-action@v7`); при постановке каркаса свериться с релизами — мажоры уезжают.

### 4.4. Почему compose привозится деплоем

Файл на сервере всегда равен файлу в `main` — состояние stage воспроизводимо из репозитория, «крутили руками на сервере» исключено. Руками правится только `.env`.

---

## 5. Первый прогон — чек-лист

1. Шаг 1 каркаса замержен в `main` → вкладка Actions: `ci` и `deploy-stage` зелёные.
2. В **Packages** появились `fs-lms/backend`, `fs-lms/frontend` → выставить Public (§3.4) → перезапустить деплой-джобу.
3. `http://11.11.11.24` открывает приложение; `http://11.11.11.24/api/v1/health` отвечает `{"status":"ok", ...}`.
4. `http://11.11.11.24:8025` — Mailpit пустой и живой.
5. Пустой коммит в `main` → через ~3–5 минут на stage новая версия без каких-либо ручных действий.

---

## 6. Эксплуатация

**Откат** — это деплой предыдущего образа, отдельного механизма нет:

- из GitHub: Actions → прогон нужного коммита → **Re-run job** `deploy`;
- руками на LXC 124: `IMAGE_TAG=sha-<старый> bash stage-deploy.sh` (файл лежит в `/opt/fs-lms` после любого деплоя — при желании сохранить: `rsync` его туда в §4.3 вместе с compose).

Миграции при откате **не откатываются автоматически** — по правилу expand–contract (02-tech §19) схема релиза N совместима с кодом N−1, поэтому откат кода безопасен без отката схемы.

**Логи**: `ssh deploy@11.11.11.24`, дальше `docker compose -f /opt/fs-lms/compose.stage.yml logs -f api`.

**Диск**: старые образы копятся с каждым деплоем. Раз в неделю от root на LXC 124:

```bash
echo '0 5 * * 1 root docker system prune -af --filter "until=168h" >/var/log/docker-prune.log 2>&1' > /etc/cron.d/docker-prune
```

**Раннер**: обновляется сам; после ребута стартует сервисом. Если в GitHub он `Offline` — `./svc.sh status` / `./svc.sh start` на LXC 125.

**База stage** — одноразовая по определению: бэкапы не делаем, пересоздание — `docker compose down -v && деплой`.

---

## 7. Траблшутинг

| Симптом | Причина | Что делать |
|---|---|---|
| `docker run hello-world` падает с ошибкой прав | нет `nesting=1` | `pct set 124 --features nesting=1,keyctl=1` и рестарт контейнера |
| `docker run` → `permission denied ... net.ipv4.ip_unprivileged_port_start` | containerd.io ≥ 1.7.28-2 на PVE ≤ 9.0 (AppArmor LXC) — nesting не лечит | обновить Proxmox до 9.1+; временно — даунгрейд `containerd.io=1.7.28-1*` + `apt-mark hold` (§1.1) |
| `docker info` → `Storage Driver: vfs` | overlayfs недоступен (обычно ZFS-хранилище на старом стеке) | `apt install fuse-overlayfs`, рестарт Docker; либо rootfs на ext4/LVM |
| `docker info` → `overlayfs` + `io.containerd.snapshotter.v1` | это не ошибка: containerd image store — умолчание Docker 29+ | ничего — норма (§1.3) |
| `timedatectl` висит и падает по таймауту D-Bus | LXC без `nesting=1` — systemd-timedated не стартует | `pct set <id> --features nesting=1` и рестарт; либо `ln -sf /usr/share/zoneinfo/Europe/Moscow /etc/localtime` |
| `pull` → `denied` на ghcr.io | пакет ещё приватный | §3.4 — сделать Public, перезапустить деплой |
| деплой-джоба висит в Queued | раннер offline или без метки `stage` | §2.5, проверить `--labels stage` |
| health-гейт падает, контейнеры живые | миграция не прошла или api не дошёл до Ready | лог джобы покажет `logs --tail=100 api` — читать причину там |
| `Permission denied (publickey)` в деплой-джобе | ключ раннера не в `authorized_keys` или sshd закрыт | §2.3, §1.4 |

---

## 8. Запасной вариант без раннера

Если self-hosted раннер станет обузой: на LXC 124 systemd-таймер каждые 5 минут делает `compose pull && up -d` по тегу `latest`. Безопасность не хуже (в GHCR нет непротестированных образов), но теряются мгновенность, health-гейт в статусе коммита и явный лог деплоя в Actions. Переход — удалить деплой-джобу и раннер, добавить таймер; обратный переход симметричен.
