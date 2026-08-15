# UI: карта покрытия и план реализации фронтенда

> **Статус:** принято (14.08.2026). Рабочий документ разработчика фронтенда.
> **Связанные:** [03-design.md](../03-design.md) §8 — каталог компонентов (имена ниже — оттуда); §4 — детальные описания экранов; [variables.scss](variables.scss) и [theme.ts](theme.ts) — токены и тема; 02-tech §11 — frontend-архитектура, §23 — фазы продукта.
> **Кому:** документ написан для разработчика, который собирает фронтенд впервые. Порядок волн — это и есть план работ: идти сверху вниз, не перепрыгивая.

---

## 1. Как работать по этому документу

**Истина по каждому экрану — три источника, в этом порядке:**

1. **Мокап** (`Mockups/NN-*.html`, открыть в браузере) — как экран выглядит и ведёт себя. Демо-переключатели в шапке мокапа (роль, модуль, день) — не мусор, а спецификация состояний: каждый переключатель — состояние, которое экран обязан уметь.
2. **03-design §4.x** — почему экран устроен так и какие правила за ним стоят.
3. **Каталог §8** — из каких компонентов экран собирается (карта ниже — краткая выжимка).

**Порядок работы над экраном:**

1. Прочитать §4.x и открыть мокап рядом с редактором.
2. Проверить по карте (раздел 2), какие компоненты уже готовы, каких нет. Недостающие компоненты делаются **до** экрана, в изоляции — на dev-роуте-плейграунде.
3. Собрать экран только из компонентов каталога. Захотелось написать локальный `<div>` со стилями — стоп: либо это конфигурация существующего компонента, либо новая строка в §8 через обсуждение.
4. Прогнать чек-лист готовности (ниже) и сверить с мокапом на 1440px и 1024px.

**Definition of Done экрана:**

- [ ] Совпадает с мокапом **по составу, раскладке и поведению** на 1440 и 1024; экраны «Обучения» и плеер — и на мобильном (mobile-first, §1.3). Мокап — не пиксель-перфект и не источник текстов: стили — из темы и токенов, тексты — из i18n-словаря (04-conventions §7).
- [ ] Все серверные состояния: загрузка (Skeleton), пусто (EmptyState **с действием**), ошибка (тост или у полей), нет прав (объяснение, а не пустой экран — 01-product §3.4).
- [ ] Все переходы — `<a href>`: средняя кнопка и Ctrl+клик открывают новую вкладку (§3.10). Действия — кнопки.
- [ ] Ни одного хардкода строк — всё через i18n-словарь; статусы — только StatusBadge.
- [ ] Ни одного числа и hex-цвета в стилях — только токены `var(--…)` и тема.
- [ ] В сетках работает клавиатура, фокус видим (§1.12).
- [ ] Прочерк и пустота различаются: прочерк = «должно быть, но нет», пустота = «нечего показывать» (§3.7).

**Данные:** сгенерированный `api-client` + TanStack Query (02-tech §11.2); меню, роуты и права — только из `/api/v1/config` (02-tech §4.6). Пока бэкенда нет, экраны собираются на моках с теми же типами.

---

## 2. Карта покрытия: экран → компоненты

Слой 1 (Mantine напрямую: Button, поля, Tabs, Modal…) подразумевается везде и в карте не повторяется. Каркас (AppShell + AppSidebar + AppHeader + SpaceSwitcher + NotifBell + Breadcrumbs) — общий для всех экранов «Управления» и «Обучения».

| Мокап | Экран (спека) | Обёртки (§8.4) | Предметные (§8.5) |
|---|---|---|---|
| 10 | Главная сотрудника (§3.1) | KpiTile, StatusBadge, LinkRow, SectionCard, EmptyState («Ваши разделы») | HomeBlocks |
| 11 | Главная ученика (§3.7) | SectionCard, StatusBadge, LinkRow, EmptyState | HomeBlocks (блок занятия, «Что сделать») |
| 01 | Конструктор курса (§4.1) | RichText, AutosaveBadge, StatusBadge, InlineBanner (копии), ConfirmModal | CourseTree, StepStrip, StepIcon |
| 02 | Плеер (§4.2) | InlineBanner (режимы), AutosaveBadge, StatusBadge | PlayerShell, CourseTree (язычок), StepStrip, StepIcon, LongreadToc + ReadingProgress, TaskCardList |
| 12 | Экзамен (§4.6) | AutosaveBadge (со временем), InlineBanner (обрыв связи), ConfirmModal (завершение) | ExamShell |
| 03 | КТП и расписание (§4.3) | StatusBadge, ConfirmModal (сводка публикации), FormModal (занятие), TimeSelect, AppToast | KtpCalendar + TopicsPanel, RegularityBar, Tip |
| 04 | Журнал (§4.4) | LinkRow/CellLink, AppToast, InlineBanner (плашка незаполненного) | JournalGrid, Tip, StepIcon |
| 05 | Проверка (§4.5) | DataTable, CountBadge, StatusBadge, LinkRow, RichText (комментарий) | CriteriaScorer (+липкая панель заданий) |
| 06 | Индивидуальные / Расписание (§4.10) | FormModal, TimeSelect, SegmentedControl (календарь/список), DataTable | WeekCalendar, Tip |
| 07 | Сводка по ученику + список групп (§4.11, §4.14) | StatRow, DataTable, ChipList, StatusBadge, LinkRow, PickScreen, FormModal (временный пароль) | AttendanceStrip, ProgressCell (полоса шагов урока), Tip |
| 08 | Урок по группе (§4.12) | LinkRow, PickScreen | ProgressGrid, StepIcon, Tip |
| 09 | Работа по группе (§4.13) | LinkRow, StatusBadge, PickScreen | ProgressGrid, Tip |
| 13 | Конструктор работы (§4.9) | Radio-cards (режим), StatusBadge, Drawer (задача), сортируемый список заданий | — (редактор критериев — форма) |
| 14 | Банк задач (§4.9) | DataTable, SearchInput, MassActionsBar, ChipList, StatusBadge, LinkRow | StepIcon (метка проверки) |
| 15 | Конструктор задачи (§4.9) | RichText, ChipList (темы из справочника), FormModal (новая тема), SectionCard («Где используется»), AutosaveBadge, ConfirmModal («Сохранить копией») | — |
| 16 | Календарь ученика (§4.21) | StatusBadge, LinkRow | StudentMonthCalendar |
| 17 | Результаты (§4.21) | DataTable, StatusBadge, LinkRow | — |
| 18 | Мои курсы (§4.21) | SectionCard, Progress, LinkRow, EmptyState | — |
| 19 | Лицевой счёт — кабинет (§4.7) | MoneyText, FormModal (оплата), InlineBanner (долг), SectionCard, LinkRow `is-off` (представитель) | BalanceCard, LedgerFeed |
| 20 | Карточка группы (§4.14) | KpiTile, DataTable (состав), StatusBadge, ChipList, ConfirmModal (отчисление/перевод), FormModal (замены), MoneyText, InlineBanner (замена) | RegularityBar |
| 21 | Сотрудники и роли (§4.15) | DataTable, KpiTile (нагрузка), ChipList (роли), ConfirmModal, FormModal, SearchInput, StatusBadge | — |
| 22 | Ученики и представители (§4.16) | DataTable ×2, SearchInput, ChipList, StatusBadge, MoneyText, FormModal («Назначить родителя») | JoinLinkPill |
| 23 | Приём (§4.17) | KpiTile-фильтры, DataTable, FormModal (зачисление + приказ), StatusBadge, LinkRow | JoinLinkPill, PipelineSteps |
| 24 | Финансы (§4.18) | KpiTile, SegmentedControl, DataTable, MoneyText, FormModal (платёж/скидка/возврат), ConfirmModal (сторно) | LedgerFeed |
| 25 | Витрина (§4.8) | DataTable, SectionCard, ChecklistCard, FormModal (запуск набора), StatusBadge (вычисленные метки), MoneyText, RichText | — |
| 26 | Настройки обучения (§4.19) | SettingRow, DataTable (справочники), FormModal, ConfirmModal (закрытие периода со сводкой), StatusBadge | — |
| 27 | Настройки системы (§4.20) | SettingRow, SectionCard, DataTable (редакции, коды), ConfirmModal (публикация редакции), StatusBadge | — |

Публичная часть (лендинг, каталог, статьи) — **не React**: серверный Jinja2 (02-tech §11.1), в этот план не входит.

---

## 3. Обратный индекс: что строить первым

Частота использования — это и есть приоритет: компонент из двадцати экранов блокирует двадцать экранов.

**Обёртки (§8.4), по убыванию охвата:**

| Компонент | Экранов | Комментарий |
|---|---|---|
| StatusBadge, LinkRow/CellLink, AppToast, EmptyState | ~20 (все) | без них не собрать ни один экран — первые |
| SectionCard, DataTable | ~15 | каркас любого списочного экрана |
| FormModal, ConfirmModal | ~12 | все операции |
| ChipList, KpiTile, StatusBadge-словарь | 6–8 | |
| MoneyText | 6 | все финансовые места |
| SearchInput, PickScreen, CountBadge, AutosaveBadge, RichText | 3–5 | RichText тяжёлый (TipTap) — начать раньше, чем кажется нужным |
| MassActionsBar, TimeSelect, SettingRow, ChecklistCard, StatRow, InlineBanner | 1–3 | по мере экранов |

**Предметные (§8.5) → экраны:**

| Компонент | Экраны (мокапы) |
|---|---|
| StepIcon | 01, 02, 04, 08, 14 |
| Tip | 03, 04, 06, 07, 08, 09 |
| ProgressCell / ProgressGrid | 07, 08, 09 |
| CourseTree | 01, 02 |
| StepStrip | 01, 02 |
| LedgerFeed | 19, 24 |
| RegularityBar | 03, 20 |
| HomeBlocks | 10, 11 |
| KtpCalendar + TopicsPanel | 03 (+ упрощённый режим У2) |
| WeekCalendar | 06 (оба ролевых вида) |
| JournalGrid | 04 |
| AttendanceStrip | 07 |
| PlayerShell, LongreadToc, TaskCardList | 02 |
| ExamShell | 12 |
| CriteriaScorer | 05 |
| BalanceCard | 19 |
| JoinLinkPill, PipelineSteps | 23 (JoinLinkPill также 22) |
| StudentMonthCalendar | 16 |
| AppSidebar, AppHeader, SpaceSwitcher, NotifBell | все экраны |

---

## 4. План реализации по волнам

Волны привязаны к фазам продукта (02-tech §23): фронт не убегает вперёд бэкенда, каждая волна заканчивается работающими экранами. Внутри волны порядок — сверху вниз: сначала компоненты, потом экраны из них.

### Волна 0 — фундамент (= фаза 0 «Каркас»)

| Шаг | Что | Результат |
|---|---|---|
| 0.1 | Подключить [variables.scss](variables.scss) и [theme.ts](theme.ts); dev-роут-плейграунд для компонентов | тема применяется, произвольных стилей нет |
| 0.2 | Каркас: AppShell + AppSidebar (меню из `/config`, группы §2.1.1, сворачивание) + AppHeader (крошки, колокольчик-стаб) + SpaceSwitcher | walking skeleton: логин → экран с меню |
| 0.3 | Базовые обёртки: StatusBadge (+словарь statusPalette), AppToast, EmptyState, SectionCard, LinkRow/CellLink, CountBadge | плейграунд показывает все варианты |
| 0.4 | Формы и списки: FormModal, ConfirmModal, DataTable (пагинация, фильтры, итоговая строка), SearchInput | один настоящий список (например, «Предметы» из §4.19) от API до экрана |

**DoD волны:** вход → меню по правам → рабочий список с пагинацией; eslint-границы пакетов зелёные.

### Волна 1 — контент и прохождение (= фаза 1 «Core-минимум»)

| Шаг | Компоненты | Экраны |
|---|---|---|
| 1.1 | RichText (TipTap: bubble-меню, markdown, «/»-вставка), AutosaveBadge | — |
| 1.2 | StepIcon, StepStrip, CourseTree | 01 Конструктор курса |
| 1.3 | ChipList, MassActionsBar, PickScreen | 14 Банк задач, 15 Конструктор задачи |
| 1.4 | сортируемый список заданий, Radio-cards режима | 13 Конструктор работы |
| 1.5 | PlayerShell, LongreadToc + ReadingProgress, TaskCardList | 02 Плеер (режимы: ученик, предпросмотр, педагог) |
| 1.6 | ProgressCell / ProgressGrid | 08 Урок по группе, 09 Работа по группе (базово) |
| 1.7 | SettingRow | 26 Настройки обучения (предметы, периоды, типы работ, шкалы) |
| 1.8 | — | 18 Мои курсы, список групп (07 #pick) |

**DoD волны:** веха «базовая LMS» проходит через UI: создать курс → записать (черновой формой) → пройти в плеере → увидеть прогресс в 08.

### Волна 2 — У1 целиком (= фаза 2)

| Шаг | Компоненты | Экраны |
|---|---|---|
| 2.1 | Tip | подключить в 08/09 |
| 2.2 | KtpCalendar + TopicsPanel, RegularityBar | 03 КТП |
| 2.3 | JournalGrid | 04 Журнал (клавиатура обязательна) |
| 2.4 | AttendanceStrip, StatRow | 07 Сводка по ученику (полная) |
| 2.5 | WeekCalendar, TimeSelect | 06 Индивидуальные + Расписание |
| 2.6 | CriteriaScorer | 05 Проверка |
| 2.7 | MoneyText, LedgerFeed, BalanceCard | 19 Счёт (кабинет), 24 Финансы (режим отметок У1) |
| 2.8 | KpiTile | 20 Карточка группы |
| 2.9 | HomeBlocks | 10 Главная сотрудника, 11 Главная ученика |
| 2.10 | ExamShell | 12 Экзамен |
| 2.11 | PipelineSteps (короткий конвейер, без ЭДО/«Школы») | 23 Приём, 22 Люди, 21 Сотрудники |
| 2.12 | — | 16 Календарь, 17 Результаты, 27 Настройки системы (базово) |

**DoD волны:** продаваемый У1 — все экраны У1 живут на реальном API; кабинет ученика работает с телефона.

### Волна 3 — витрина У2 (= фаза 3)

ChecklistCard → 25 Витрина; упрощённый режим «Расписание» У2 (вариант 03 без календаря, слотов и термина КТП); онлайн-оплата в 19 (FormModal провайдера, статусы intent); предзапись и метки карточек.

### Волна 4 — У3/У4 (= фаза 4)

Замены (список + форма) в 20; вкладка «Кабинеты» в 26; полный конвейер приёма: JoinLinkPill → 23/22, договоры и приказы (FormModal), переключение состава шагов по модулям; версии согласий и оферты в 27; сертификат в карточке (25).

Модули фазы 5 (ЕГЭ, SMM, код, маркетинг) приносят свои компоненты через фиче-спеки — в §8.5 они появятся записями, здесь — новыми строками волн.

---

## 5. Решения, которые понадобятся по дороге (дырки реестра)

Реестр зависимостей (02-tech §1.5) пополняется только через PR с обоснованием. Уже известные будущие кандидаты — согласовать заранее, не в момент, когда всё встало:

| Потребность | Где всплывёт | Решение |
|---|---|---|
| Набор иконок интерфейса (меню, действия; Mantine иконок не несёт, в мокапах — юникод-глифы) | волна 0, шаг 0.2 | ✅ **`@tabler/icons-react`** — согласовано 15.08.2026 |
| Drag-n-drop (дерево курса, полоса шагов, темы → слоты КТП, состав работы) | волна 1, шаг 1.2 | ✅ **`@dnd-kit/core` + `@dnd-kit/sortable`** — согласовано 15.08.2026, входит в реестр при первой задаче волны 1 |
| Формулы в редакторе и условиях задач (§1.4) | волна 1, шаг 1.1 | кандидат: tiptap-расширение + KaTeX — утвердить фиче-спекой конструктора |
| Графики аналитики | фаза 5, не сейчас | решить при фиче-спеке модуля «Маркетинг» |

Уже в реестре и хватает: tiptap (RichText), dayjs (даты, требование Mantine dates), i18next, TanStack Query.

Отдельно: Storybook в реестре нет и не планируется — изоляция компонентов делается dev-роутом-плейграундом внутри `app` (ноль новых зависимостей); если он станет тесен, возвращаемся к вопросу через PR.
