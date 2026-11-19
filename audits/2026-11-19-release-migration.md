# Сверка переноса FS LMS 1 → FS LMS 2

Дата: 19 ноября 2026. Статус: сверка завершена; однозначные противоречия исправлены в документации. Результат прохода: 13 групп исправлено, F08 и F09 уточнены с сохранением открытой детализации, F13 ожидает проверки окружения.

Этот файл фиксирует покрытие источника и расхождения после обсуждения. Статус «Принято» означает записанное требование, а не реализованную или протестированную функцию. Последнее решение пользователя важнее исторического текста ReleaseHistory и ранних абзацев DesDoc.

Проверены продуктовая, техническая и интерфейсная спецификации, связанные соглашения, UI-план, каркасная спека и инструкции доставки. HTML-мокапы проверены текстовым поиском и инвентаризацией, без визуального прогона. Код WordPress не аудировался на соответствие всем заявленным функциям; рабочая LMS 2, сеть и CI не запускались. Версии зависимостей и правовые утверждения старой документации не проверялись внешними источниками.

## 1. Результат

Основные функциональные решения присутствуют в документации. Источник целиком распределён по контрольным группам ниже; подробные подпункты относятся к той же группе, что и содержащий их диапазон. Из 16 групп F01–F07, F10–F12, F14–F16 исправлены. Для F08 перечень состояний авторизации приведён к принятым требованиям без выдуманной физической схемы; точные миграции требуют auth-фиче-спеки. Для F09 удалены обещания общей базы и формирования договора в LMS, способ подтверждения готовности договора остаётся открытым. F13 требует фактической проверки сети.

Новый пакет переноса фич не нужен. Следующий шаг — закрыть Q01–Q03 и детализировать auth/офисную фиче-спеку. Новые продуктовые решения при исправлении не принимались. Описания находок ниже сохраняют смысл исходной сверки; ссылки пересчитаны на актуальный контекст после правок, результаты указаны отдельно.

## 2. Найденные расхождения

### F01. Дублирование всё ещё доступно через «Сохранить копией»

Статус после правок: **Исправлено**.

Результат: Убраны сохранение копией, правило правки чужого предмета копией и общая рекомендация повторного использования через копирование. Ранее согласованный импорт сохранён.

Приоритет: **Высокий**.

Контекст после правок: [01-product.md:900](/Users/daniil/DesDoc/01-product.md:900), [01-product.md:872](/Users/daniil/DesDoc/01-product.md:872), [01-product.md:923](/Users/daniil/DesDoc/01-product.md:923), [03-design.md:747](/Users/daniil/DesDoc/03-design.md:747), [ui-plan.md:63](/Users/daniil/DesDoc/ui-kit/ui-plan.md:63).

Принято: Принят полный отказ от дублирования, импорт обсуждается отдельно.

Основание: [01-product.md:657](/Users/daniil/DesDoc/01-product.md:657).

Замечание исходной сверки: Убрать сохранение задачи копией и старые отсылки к копированию как отдельной операции; импорт не удалять.

### F02. Блокировка состава начинается слишком поздно в старых абзацах

Статус после правок: **Исправлено**.

Результат: Конвейер и перетаскивание блокируются с первой начатой попытки в группе. Дополнение остаётся отдельной выдачей.

Приоритет: **Высокий**.

Контекст после правок: [01-product.md:890](/Users/daniil/DesDoc/01-product.md:890), [03-design.md:697](/Users/daniil/DesDoc/03-design.md:697).

Принято: Состав и максимум фиксируются с первой начатой попытки в группе, а не с первой завершённой сдачи.

Основание: [01-product.md:850](/Users/daniil/DesDoc/01-product.md:850), [02-tech.md:638](/Users/daniil/DesDoc/02-tech.md:638).

Замечание исходной сверки: Заменить условие в конвейере и drag-reorder на наличие начатой попытки, сохранить отдельные дополнения.

### F03. Сетка журнала всё ещё предполагает «занятие = один урок»

Статус после правок: **Исправлено**.

Результат: Журнал описан через проведение, одну посещаемость и выдачи работ; несколько тем и продолжения не дублируют итог.

Приоритет: **Высокий**.

Контекст после правок: [03-design.md:557](/Users/daniil/DesDoc/03-design.md:557).

Принято: У занятия несколько тем, одна тема проходит на нескольких занятиях; факт посещения один.

Основание: [01-product.md:443](/Users/daniil/DesDoc/01-product.md:443), [01-product.md:850](/Users/daniil/DesDoc/01-product.md:850).

Замечание исходной сверки: Переписать модель колонок и источника работ по выдачам/проведению, исключить повторный подсчёт продолжений.

### F04. В редакторе обещан разбор просто после сдачи

Статус после правок: **Исправлено**.

Результат: Показ разбора связан с верным ответом или исчерпанным лимитом и, для экзамена, с доступностью результата.

Приоритет: **Высокий**.

Контекст после правок: [03-design.md:746](/Users/daniil/DesDoc/03-design.md:746).

Принято: Эталон виден после верного решения или исчерпания лимита; экзамен дополнительно учитывает публикацию результата.

Основание: [01-product.md:741](/Users/daniil/DesDoc/01-product.md:741), [02-tech.md:612](/Users/daniil/DesDoc/02-tech.md:612).

Замечание исходной сверки: Сослаться на единые правила завершения задачи вместо безусловного «после сдачи».

### F05. Плитки и педагогический кокпит всё ещё названы обязательным составом

Статус после правок: **Исправлено**.

Результат: Кокпит исключён из обязательного состава уровня, старые плитки и приоритеты названы историческими вариантами. Рабочие данные не удалены.

Приоритет: **Средний**.

Контекст после правок: [01-product.md:102](/Users/daniil/DesDoc/01-product.md:102), [01-product.md:947](/Users/daniil/DesDoc/01-product.md:947), [03-design.md:227](/Users/daniil/DesDoc/03-design.md:227).

Принято: Главная преподавателя и сами плитки будут переделаны; отдельный кокпит не принят в первый релиз.

Основание: [01-product.md:835](/Users/daniil/DesDoc/01-product.md:835), [01-product.md:832](/Users/daniil/DesDoc/01-product.md:832).

Замечание исходной сверки: Отделить потребность в данных от фиксированного расположения/набора плиток, убрать обязательный кокпит из уровня.

### F06. Каркасная спека по-прежнему создаёт password_enc

Статус после правок: **Исправлено**.

Результат: Поле password_enc удалено из каркасной спецификации; запрет обратимого постоянного хранения и актуальные требования auth указаны явно.

Приоритет: **Высокий**.

Контекст после правок: [001-karkas-monorepo.md:63](/Users/daniil/DesDoc/specs/001-karkas-monorepo.md:63).

Принято: Постоянных обратимых копий паролей нет, действующий пароль сотрудник не читает.

Основание: [01-product.md:544](/Users/daniil/DesDoc/01-product.md:544), [02-tech.md:967](/Users/daniil/DesDoc/02-tech.md:967).

Замечание исходной сверки: Обновить спецификацию каркаса до реализации/применения схемы; исходный код в этом аудите не проверялся.

### F07. Описание импортированного password_hash осталось от приглашений

Статус после правок: **Исправлено**.

Результат: Убрано требование импортированному ученику сначала установить пароль. Модель допускает согласованную проверяемую совместимость прежнего пароля.

Приоритет: **Средний**.

Контекст после правок: [02-tech.md:286](/Users/daniil/DesDoc/02-tech.md:286).

Принято: Импорт сохраняет прежние логин и пароль, смена по приглашению не обязательна.

Основание: [01-product.md:1153](/Users/daniil/DesDoc/01-product.md:1153), [02-tech.md:963](/Users/daniil/DesDoc/02-tech.md:963).

Замечание исходной сверки: Уточнить модель импортированного хэша/совместимого проверяемого секрета согласно миграционной фиче-спеке.

### F08. Реестр таблиц не догнал принятые правила авторизации

Статус после правок: **Уточнено; физическая схема ожидает фиче-спеки**.

Результат: Реестр описывает принятые инварианты сессий устройств, TOTP/почтового фактора и парного ограничения входа. Старые узкие scope/CHECK не выданы за готовую схему. Новые колонки и миграции не проектировались.

Приоритет: **Средний**.

Контекст после правок: [02-tech.md:301](/Users/daniil/DesDoc/02-tech.md:301), [02-tech.md:302](/Users/daniil/DesDoc/02-tech.md:302), [02-tech.md:303](/Users/daniil/DesDoc/02-tech.md:303).

Принято: Есть группы сессий устройств, абсолютные/скользящие сроки, TOTP и почтовый второй фактор, ступень на пару IP + пользователь и сброс со всех IP.

Основание: [02-tech.md:985](/Users/daniil/DesDoc/02-tech.md:985), [02-tech.md:971](/Users/daniil/DesDoc/02-tech.md:971), [02-tech.md:975](/Users/daniil/DesDoc/02-tech.md:975).

Замечание исходной сверки: В auth-фиче-спеке довести ограничения и модель данных: сейчас scope только ip/account, нет описания всех новых состояний. Не выдумывать колонки при аудите.

### F09. Старое ЭДО обещает формирование и подписание договора внутри LMS

Статус после правок: **Частично исправлено; Q02 открыт**.

Результат: Уровни, описание ЭДО и экран приёма больше не обещают создание/подписание договора в LMS. Офисное оформление отделено; способ отражения готовности договора для зачисления намеренно не выбран.

Приоритет: **Высокий**.

Контекст после правок: [01-product.md:108](/Users/daniil/DesDoc/01-product.md:108), [01-product.md:122](/Users/daniil/DesDoc/01-product.md:122), [03-design.md:943](/Users/daniil/DesDoc/03-design.md:943), [03-design.md:970](/Users/daniil/DesDoc/03-design.md:970).

Принято: База договоров, формирование и печать находятся в самостоятельной офисной системе; в LMS рабочие реквизиты.

Основание: [01-product.md:1037](/Users/daniil/DesDoc/01-product.md:1037), [02-tech.md:856](/Users/daniil/DesDoc/02-tech.md:856).

Замечание исходной сверки: Согласовать описание модуля/уровней и приём с новой границей. Способ подтверждения готовности договора для зачисления вынести в Q02, не выбирать автоматически.

### F10. Один абзац взрослой формы одновременно включает и запрещает документы

Статус после правок: **Исправлено**.

Результат: Взрослая и несовершеннолетняя ветки разделены; абсолютный запрет документальных полей во взрослой форме убран.

Приоритет: **Средний**.

Контекст после правок: [03-design.md:1088](/Users/daniil/DesDoc/03-design.md:1088).

Принято: Взрослый собирает документы при ЭДО в своей форме; подросток — через представителя, документы зашифрованы.

Основание: [01-product.md:486](/Users/daniil/DesDoc/01-product.md:486).

Замечание исходной сверки: Убрать абсолютное «документальная часть в эту форму не входит никогда», явно разделить возрастные ветки.

### F11. План компонентов и правило приоритета мокапов устарели

Статус после правок: **Исправлено в документации**.

Результат: Статус всех HTML как исторических закреплён в Mockups/README.md, AGENTS/CLAUDE, соглашениях и UI-плане. Создание задачи в работе указано конвейером. Исторические HTML не переписывались.

Приоритет: **Средний**.

Контекст после правок: [ui-plan.md:61](/Users/daniil/DesDoc/ui-kit/ui-plan.md:61), [ui-plan.md:13](/Users/daniil/DesDoc/ui-kit/ui-plan.md:13), [04-conventions.md:584](/Users/daniil/DesDoc/04-conventions.md:584).

Принято: Все старые мокапы будут переделаны. Конвейер работы уже не дровер; старое поведение нельзя считать нормативным без проверки.

Основание: [03-design.md:439](/Users/daniil/DesDoc/03-design.md:439).

Замечание исходной сверки: Обозначить весь комплект историческим, проверять состав по актуальной спецификации/новым макетам; обновить карту экранов.

### F12. Один номер §4.22 обозначает два разных экрана

Статус после правок: **Исправлено**.

Результат: Auth — §4.22, служебные страницы — §4.23, уведомления — §4.24, настройки уведомлений — §4.25. Связанные ссылки в актуальных документах обновлены.

Приоритет: **Средний**.

Контекст после правок: [03-design.md:1076](/Users/daniil/DesDoc/03-design.md:1076), [03-design.md:1158](/Users/daniil/DesDoc/03-design.md:1158).

Принято: Ссылки должны однозначно вести к auth или уведомлениям.

Основание: [03-design.md:1166](/Users/daniil/DesDoc/03-design.md:1166).

Замечание исходной сверки: Развести номера разделов, обновить адресные ссылки в документах и UI-плане; это редакционная правка без нового поведения.

### F13. Входящий офисный приёмник пока не подтверждён инфраструктурой

Статус после правок: **Открыто; требуется проверка окружения**.

Результат: Сетевые настройки и действующее наличие входящего маршрута не проверялись и не менялись. Q03 остаётся открытым.

Приоритет: **Проверить окружение**.

Где: [vpn.md:8](/Users/daniil/DesDoc/runbooks/vpn.md:8), [02-tech.md:1269](/Users/daniil/DesDoc/02-tech.md:1269).

Принято: Немедленная доставка в офис принята, серверная база не открывается наружу; IP + аутентификация соединения.

Основание: [01-product.md:548](/Users/daniil/DesDoc/01-product.md:548).

Следующее действие: Runbook описывает ограничения по состоянию на август. Проверить текущее наличие адреса/маршрута и отдельно составить runbook доставки. Отсутствие маршрута сейчас не доказано сетевой проверкой.

### F14. Пример Compose допускает latest вопреки адресуемой выкладке

Статус после правок: **Исправлено в эталоне**.

Результат: Оба образа приложения в Compose требуют IMAGE_TAG; fallback на latest удалён. Развёрнутый сервер и CI не изменялись.

Приоритет: **Низкий**.

Контекст после правок: [stage.md:286](/Users/daniil/DesDoc/runbooks/stage.md:286), [stage.md:293](/Users/daniil/DesDoc/runbooks/stage.md:293).

Принято: Деплой и откат используют явно выбранный SHA-набор образов и соответствующую конфигурацию.

Основание: [delivery.md:33](/Users/daniil/DesDoc/runbooks/delivery.md:33), [stage.md:314](/Users/daniil/DesDoc/runbooks/stage.md:314).

Замечание исходной сверки: Убрать fallback в эталонном Compose или явно ограничить его историческим примером. Скрипт деплоя уже требует IMAGE_TAG; это не утверждение о сбое текущего CI.

### F15. Правила живого содержимого сформулированы слишком широко

Статус после правок: **Исправлено**.

Результат: Живые лекции отделены от истории редакций задач и сохранённых экзаменационных снимков. Тотальное версионирование лекций не введено.

Приоритет: **Средний**.

Контекст после правок: [01-product.md:564](/Users/daniil/DesDoc/01-product.md:564), [01-product.md:661](/Users/daniil/DesDoc/01-product.md:661).

Принято: У задачи есть история редакций, у выданного экзамена исходный снимок и явные коррекции.

Основание: [01-product.md:916](/Users/daniil/DesDoc/01-product.md:916), [01-product.md:780](/Users/daniil/DesDoc/01-product.md:780).

Замечание исходной сверки: Разделить живое содержимое лекции, редакции задач и зафиксированные выдачи/экзамены; не отменять принятые снимки общей фразой.

### F16. У материалов лекции осталась ссылка на временной критерий

Статус после правок: **Исправлено**.

Результат: Упоминания временного критерия лекции заменены фактом открытия; скачивания не влияют на прохождение.

Приоритет: **Низкий**.

Контекст после правок: [01-product.md:723](/Users/daniil/DesDoc/01-product.md:723), [02-tech.md:587](/Users/daniil/DesDoc/02-tech.md:587).

Принято: Лекция считается пройденной при открытии, скачивание не влияет.

Основание: [01-product.md:695](/Users/daniil/DesDoc/01-product.md:695), [02-tech.md:608](/Users/daniil/DesDoc/02-tech.md:608).

Замечание исходной сверки: Заменить старое упоминание времени на факт открытия.

## 3. Матрица источника

Диапазоны покрывают строки 1–1009 без пропусков и наложений. Сводные выводы источника не считаются новыми фичами второй раз. «Перепроектирование» не даёт старому макету статуса принятого нового дизайна.

| ID | Источник | Функция / правило | Статус | Запись в DesDoc | Уточнение |
|---|---|---|---|---|---|
| R001 | [источник 1–9](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:1) | Основание и период истории | Справочно | [01-product.md:23](/Users/daniil/DesDoc/01-product.md:23) | Источник v1, не спецификация новой реализации. |
| R002 | [источник 10–15](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:10) | Срок домашней работы от следующего занятия | Принято | [01-product.md:456](/Users/daniil/DesDoc/01-product.md:456) | Перенос и отмена учитываются; связанный срок сдвигается. |
| R003 | [источник 16–24](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:16) | Поздняя сдача, несданное, новые ученики | Изменено | [01-product.md:457](/Users/daniil/DesDoc/01-product.md:457) | Поздняя сдача разрешена; работы до зачисления не просрочены для новичка. |
| R004 | [источник 25–31](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:25) | Пересдачи и сохранение верных ответов | Принято | [02-tech.md:640](/Users/daniil/DesDoc/02-tech.md:640) | Лимит у работы, история, блокировка верных и зачтённых ответов. |
| R005 | [источник 32–39](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:32) | Опрос и допустимые типы | Изменено | [01-product.md:814](/Users/daniil/DesDoc/01-product.md:814) | Пять типов работ; ограничения шаблонов действуют в обе стороны. |
| R006 | [источник 40–44](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:40) | Нормализация ответов и ручной зачёт | Принято | [01-product.md:793](/Users/daniil/DesDoc/01-product.md:793) | Специальные форматы и код не портятся общей нормализацией. |
| R007 | [источник 45–58](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:45) | Самопроверка практики | Изменено | [01-product.md:731](/Users/daniil/DesDoc/01-product.md:731) | По умолчанию 3, общий параметр; проверка не является сдачей. |
| R008 | [источник 59–64](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:59) | Решено с исправлением | Принято | [02-tech.md:644](/Users/daniil/DesDoc/02-tech.md:644) | Без снижения итогового балла. |
| R009 | [источник 65–70](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:65) | Время попыток и ответов | Принято | [01-product.md:737](/Users/daniil/DesDoc/01-product.md:737) | Отдельная длительность, сумма и время изменения ответа. |
| R010 | [источник 71–73](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:71) | Подтверждение сдачи и ошибка | Принято | [02-tech.md:652](/Users/daniil/DesDoc/02-tech.md:652) | Успех только после сервера; повтор без дубля. |
| R011 | [источник 74–83](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:74) | Эталон педагогу и закрытое решение проверяющему | Принято | [01-product.md:743](/Users/daniil/DesDoc/01-product.md:743) | Не раскрывается ученику и публичному тренажёру. |
| R012 | [источник 84–86](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:84) | Эталон ученику и исходный код ответа | Изменено | [01-product.md:741](/Users/daniil/DesDoc/01-product.md:741) | Верное решение ИЛИ исчерпан лимит, с условиями показа результатов экзамена; F04 исправлено. |
| R013 | [источник 87–88](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:87) | Консультация вместо ответа в тренажёре | Отказ | [01-product.md:1129](/Users/daniil/DesDoc/01-product.md:1129) | Публично решаются поддерживаемые автопроверкой задачи, без рекламной подмены. |
| R014 | [источник 89–91](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:89) | Ограничение материалов для представителя | Принято | [02-tech.md:614](/Users/daniil/DesDoc/02-tech.md:614) | Сервер не отдаёт скрытое содержимое и вложения. |
| R015 | [источник 92–100](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:92) | Общее условие и его шаблоны | Принято | [01-product.md:884](/Users/daniil/DesDoc/01-product.md:884) | Шаблон копирует содержимое в новую задачу; существующие не меняются. |
| R016 | [источник 101–102](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:101) | Составное 19–21 | Принято | [02-tech.md:838](/Users/daniil/DesDoc/02-tech.md:838) | Специальная возможность ЕГЭ по информатике. |
| R017 | [источник 103–106](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:103) | Код и Робо | Принято | [02-tech.md:757](/Users/daniil/DesDoc/02-tech.md:757) | Проверяется программа, ручная оценка; материалы и решение проверяющего. |
| R018 | [источник 107–108](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:107) | Номера задач | Изменено | [01-product.md:894](/Users/daniil/DesDoc/01-product.md:894) | Внутренний ID отдельно; публичный номер и URL сохраняются. |
| R019 | [источник 109–114](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:109) | Дублирование задачи | Отказ | [01-product.md:657](/Users/daniil/DesDoc/01-product.md:657) | Общий отказ от дублирования; остаток «копией» устранён по F01. |
| R020 | [источник 115–119](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:115) | CSV и символы ответа | Изменено | [01-product.md:920](/Users/daniil/DesDoc/01-product.md:920) | CSV и явное обновление; символы сохраняются, экранирование на выводе. |
| R021 | [источник 120–122](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:120) | Файлы условий и ответа | Принято | [01-product.md:795](/Users/daniil/DesDoc/01-product.md:795) | Скачивание, изображения и ZIP/RAR до 20 МБ. |
| R022 | [источник 123–126](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:123) | Редактор и фильтры банка | Изменено | [01-product.md:703](/Users/daniil/DesDoc/01-product.md:703) | Сначала вставка таблиц, затем редактор; формат и поиск описаны отдельно. |
| R023 | [источник 127–134](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:127) | Редакции, пропуски, опросные шаблоны, Робо | Изменено | [01-product.md:916](/Users/daniil/DesDoc/01-product.md:916) | 5 прошлых редакций; три режима пропусков, формулы, раздельные шаблоны. |
| R024 | [источник 135–139](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:135) | Лекции и форматированный контент | Изменено | [01-product.md:709](/Users/daniil/DesDoc/01-product.md:709) | Смыслы сохранены, выравнивание и пиксели старого дизайна не утверждены. |
| R025 | [источник 140–143](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:140) | Черновики, обязательные шаги и копирование | Изменено | [01-product.md:711](/Users/daniil/DesDoc/01-product.md:711) | Черновик не открывается; обязательных шагов нет; запрет копирования только на станции. |
| R026 | [источник 144–156](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:144) | Новый урок, продолжение и защита факта | Изменено | [01-product.md:850](/Users/daniil/DesDoc/01-product.md:850) | Ручное планирование, любое число проведений; выдачи и результаты сохраняются. |
| R027 | [источник 157–162](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:157) | Дублирование курса и уроков | Отказ | [01-product.md:657](/Users/daniil/DesDoc/01-product.md:657) | Не переносится; импорт имеет отдельные правила. |
| R028 | [источник 163–170](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:163) | Массовый подбор задач | Принято | [01-product.md:888](/Users/daniil/DesDoc/01-product.md:888) | Отметки сохраняются, уже добавленные задачи не дублируются. |
| R029 | [источник 171–194](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:171) | Импорт из другого предмета | Изменено | [01-product.md:870](/Users/daniil/DesDoc/01-product.md:870) | Методист — доступные материалы школы, автор — свои; повторный импорт запрещён; не смешивать с F01. |
| R030 | [источник 195–206](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:195) | Добавление урока, прокрутка, поиск по номеру | Принято | [01-product.md:701](/Users/daniil/DesDoc/01-product.md:701) | Урок добавляется в выбранный раздел, длинная панель прокручивается. |
| R031 | [источник 207–220](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:207) | Удаление шага и выбор типа работы | Изменено | [01-product.md:655](/Users/daniil/DesDoc/01-product.md:655) | Пустой черновик разрешён; готовность запрещена; дублирования нет. |
| R032 | [источник 221–245](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:221) | Плеер отдельного урока | Изменено | [01-product.md:691](/Users/daniil/DesDoc/01-product.md:691) | Нет дерева всего курса и обязательности; дизайн перерабатывается. |
| R033 | [источник 246–250](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:246) | Урок до открытия и раннее подключение | Изменено | [01-product.md:717](/Users/daniil/DesDoc/01-product.md:717) | Название, дата, отсчёт, без скрытого контента в ответе API. |
| R034 | [источник 251–284](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:251) | Предпросмотр и педагог | Принято | [02-tech.md:626](/Users/daniil/DesDoc/02-tech.md:626) | Проверка без учебных результатов в предпросмотре; отдельные права и контекст. |
| R035 | [источник 285–299](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:285) | Трансляция и источники записи | Изменено | [01-product.md:822](/Users/daniil/DesDoc/01-product.md:822) | Комната у группы; виртуальный блок; внешние ссылки или S3, без обязательной пары резервных источников. |
| R036 | [источник 300–307](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:300) | Очистка условий | Принято | [01-product.md:918](/Users/daniil/DesDoc/01-product.md:918) | Убирается мусор по краям, код и формулы сохраняются. |
| R037 | [источник 308–328](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:308) | Позиции экзамена и архивные типы | Изменено | [01-product.md:1121](/Users/daniil/DesDoc/01-product.md:1121) | Стабильный тип, формат и редакция; числовые WP-хитрости не переносятся. |
| R038 | [источник 329–334](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:329) | Объединение по номеру, 29/100 | Отказ | [02-tech.md:686](/Users/daniil/DesDoc/02-tech.md:686) | Временный групповой зачёт исключён; шкалы задаются у экзаменационного предмета. |
| R039 | [источник 335–340](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:335) | Лист результатов | Изменено | [03-design.md:644](/Users/daniil/DesDoc/03-design.md:644) | Результат и разбор сохраняются, точная вёрстка станции не принимается из старого сайта. |
| R040 | [источник 341–350](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:341) | Утверждение результата | Принято | [01-product.md:776](/Users/daniil/DesDoc/01-product.md:776) | Показ результата зависит от правил проведения и проверки; гостю — через промо-кабинет. |
| R041 | [источник 351–360](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:351) | Самостоятельные курсы | Принято | [01-product.md:439](/Users/daniil/DesDoc/01-product.md:439) | Основное действующее направление; без контрольных и ручного ожидания. |
| R042 | [источник 361–366](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:361) | Журнал: клавиши, переходы и подсказки | Принято | [03-design.md:563](/Users/daniil/DesDoc/03-design.md:563) | Перенос поведения, не старой внешности. |
| R043 | [источник 367–392](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:367) | Факт занятия и темы | Изменено | [01-product.md:445](/Users/daniil/DesDoc/01-product.md:445) | Многие ко многим, один факт посещения; прежняя модель исправлена по F03. |
| R044 | [источник 393–396](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:393) | Текущая группа и дополнительные занятия | Принято | [01-product.md:841](/Users/daniil/DesDoc/01-product.md:841) | Колонка доп., только участники, оба кабинета. |
| R045 | [источник 397–399](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:397) | Каникулы | Принято | [01-product.md:446](/Users/daniil/DesDoc/01-product.md:446) | Учитываются в календаре и формировании расписания. |
| R046 | [источник 400–407](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:400) | Главная преподавателя | Перепроектирование | [01-product.md:835](/Users/daniil/DesDoc/01-product.md:835) | Состав и внешний вид плиток больше не зафиксированы, F05. |
| R047 | [источник 408–409](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:408) | Автор сдачи на проверке | Принято | [03-design.md:581](/Users/daniil/DesDoc/03-design.md:581) | Общий экран проверки и идентификация ученика есть; точное размещение — новый дизайн. |
| R048 | [источник 410–414](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:410) | Зачесть работу целиком | Принято | [01-product.md:799](/Users/daniil/DesDoc/01-product.md:799) | Полный балл незачтённых заданий, подтверждение и аудит. |
| R049 | [источник 415–417](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:415) | Сводка ученика | Принято | [01-product.md:843](/Users/daniil/DesDoc/01-product.md:843) | Группа, занятия, выданные работы, попытки. |
| R050 | [источник 418–428](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:418) | Список работ и все участники | Принято | [01-product.md:834](/Users/daniil/DesDoc/01-product.md:834) | Свежие сверху, типы/группы/проверка/несдавшие, история и отменяемый ручной зачёт. |
| R051 | [источник 429–434](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:429) | Новые вкладки и возврат | Изменено | [01-product.md:943](/Users/daniil/DesDoc/01-product.md:943) | Настоящие ссылки; состояние истории без обязательных query-параметров. |
| R052 | [источник 435–458](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:435) | КТП и изменения расписания | Изменено | [01-product.md:455](/Users/daniil/DesDoc/01-product.md:455) | Опубликованное редактируется; факты сохраняются; сетка журнала согласована по F03. |
| R053 | [источник 459–462](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:459) | Активность | Изменено | [01-product.md:848](/Users/daniil/DesDoc/01-product.md:848) | Только сдача, проверка и возврат работ, без остальных пользовательских активностей. |
| R054 | [источник 463–466](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:463) | Экран и состояние адреса | Изменено | [02-tech.md:1132](/Users/daniil/DesDoc/02-tech.md:1132) | Маршрут объекта и состояние визита в history/sessionStorage. |
| R055 | [источник 467–475](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:467) | Страница курса преподавателя | Изменено | [01-product.md:715](/Users/daniil/DesDoc/01-product.md:715) | Педагог/автор и поиск приняты, расположение и сворачивание будущего — новая компоновка. |
| R056 | [источник 476–479](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:476) | Сворачивание блоков меню | Перепроектирование | [01-product.md:945](/Users/daniil/DesDoc/01-product.md:945) | Кастомизация принята как будущее, точный временный способ не закреплён. |
| R057 | [источник 480–485](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:480) | Дополнительное занятие и отмена | Изменено | [01-product.md:824](/Users/daniil/DesDoc/01-product.md:824) | Отменять с причиной можно, данные не удаляются. |
| R058 | [источник 486–488](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:486) | Посещаемость в кабинетах | Принято | [01-product.md:465](/Users/daniil/DesDoc/01-product.md:465) | Отделена от прохождения и темы. |
| R059 | [источник 489–494](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:489) | Порядок курсов и закрытые уроки | Изменено | [01-product.md:939](/Users/daniil/DesDoc/01-product.md:939) | Свежие сверху; будущие с замком и датой, а не скрыты. |
| R060 | [источник 495–497](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:495) | Оценки и переход к работе | Принято | [03-design.md:1072](/Users/daniil/DesDoc/03-design.md:1072) | Список результатов и разбор; конкретная вёрстка переосмысляется. |
| R061 | [источник 498–498](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:498) | Порядок дедлайнов | Принято | [01-product.md:941](/Users/daniil/DesDoc/01-product.md:941) | Предстоящие от ближайшего, затем просроченные. |
| R062 | [источник 499–505](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:499) | Телефон и возврат в курс | Изменено | [03-design.md:37](/Users/daniil/DesDoc/03-design.md:37) | Адаптивность, увеличение текста и сохранение контекста. |
| R063 | [источник 506–511](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:506) | Настройка главной и обратный отсчёт | Изменено | [01-product.md:945](/Users/daniil/DesDoc/01-product.md:945) | Показатели учтены, конкретные плитки и интерфейс дорабатываются. |
| R064 | [источник 512–517](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:512) | Рейтинг | Изменено | [01-product.md:957](/Users/daniil/DesDoc/01-product.md:957) | Вклад источников и максимум; предварительный без места; веса после релиза. |
| R065 | [источник 518–537](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:518) | Правила уведомлений и получатели | Принято | [01-product.md:610](/Users/daniil/DesDoc/01-product.md:610) | Каталог перенесён, настройки отдельным экраном. |
| R066 | [источник 538–544](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:538) | Закреплённые уведомления | Принято | [01-product.md:650](/Users/daniil/DesDoc/01-product.md:650) | Для учеников, условия снятия и возврата сохраняются. |
| R067 | [источник 545–549](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:545) | Фазы экзамена | Принято | [01-product.md:646](/Users/daniil/DesDoc/01-product.md:646) | Порог 5 минут; общий расчёт состояния сеанса. |
| R068 | [источник 550–553](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:550) | Дополнительные занятия: сообщения | Принято | [01-product.md:648](/Users/daniil/DesDoc/01-product.md:648) | Только ученикам, отзыв назначения при отмене. |
| R069 | [источник 554–557](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:554) | Требует внимания и канал показа | Изменено | [01-product.md:579](/Users/daniil/DesDoc/01-product.md:579) | Сигналы перенесены; компоновка главной не утверждена заново. |
| R070 | [источник 558–561](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:558) | Путь заявки семьи | Принято | [01-product.md:492](/Users/daniil/DesDoc/01-product.md:492) | Ученик → представитель → проверка → зачисление, граница офисных документов требует Q02. |
| R071 | [источник 562–566](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:562) | Ссылка 72 часа, срок 20 дней | Изменено | [01-product.md:498](/Users/daniil/DesDoc/01-product.md:498) | Сроки независимы; перевыпуск ссылки, заполненная анкета не истекает. |
| R072 | [источник 567–575](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:567) | Временный доступ и окно заявки | Принято | [01-product.md:510](/Users/daniil/DesDoc/01-product.md:510) | Прекращение по заявке, выдача отдельно от домена. |
| R073 | [источник 576–577](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:576) | Уникальность логина и почты | Изменено | [02-tech.md:969](/Users/daniil/DesDoc/02-tech.md:969) | Логин уникален; почта ученика может быть родительской, старый запрет совпадения не переносится. |
| R074 | [источник 578–580](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:578) | Анкета представителя | Изменено | [03-design.md:1100](/Users/daniil/DesDoc/03-design.md:1100) | Структура и проверка сохраняются; защита чувствительных данных и офисная печать отделены. |
| R075 | [источник 581–581](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:581) | Восстановление из архива | Принято | [01-product.md:512](/Users/daniil/DesDoc/01-product.md:512) | Создаются только недостающие аккаунты, повторное зачисление отдельно. |
| R076 | [источник 582–584](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:582) | Поиск людей, массовые действия, связи выгрузок | Изменено | [01-product.md:1159](/Users/daniil/DesDoc/01-product.md:1159) | Поиск родителя по ребёнку; документы вне CSV LMS, контакты маскированы. |
| R077 | [источник 585–589](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:585) | Подсказки школ | Изменено | [01-product.md:484](/Users/daniil/DesDoc/01-product.md:484) | Регион организации, номер/название и ручной ввод, не только Калининград. |
| R078 | [источник 590–602](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:590) | Центр печати | Изменено | [01-product.md:1037](/Users/daniil/DesDoc/01-product.md:1037) | Word-шаблоны и PDF-справки перенесены в независимую офисную систему. |
| R079 | [источник 603–614](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:603) | Ошибки и причины отказа входа | Принято | [01-product.md:1188](/Users/daniil/DesDoc/01-product.md:1188) | Диагностика без секретов, номер инцидента; пароль и его варианты не логируются. |
| R080 | [источник 615–622](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:615) | Диагностика форм | Принято | [01-product.md:496](/Users/daniil/DesDoc/01-product.md:496) | События визита без значений; отсутствие отправки не доказывает уход. |
| R081 | [источник 623–627](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:623) | Сообщения об ошибках и зачисления | Изменено | [01-product.md:1185](/Users/daniil/DesDoc/01-product.md:1185) | Материалы и аудит перенесены, офисная печать логируется в офисе. |
| R082 | [источник 628–633](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:628) | Восстановление после устаревшей сессии | Изменено | [02-tech.md:959](/Users/daniil/DesDoc/02-tech.md:959) | WP nonce не переносится; refresh-ротация есть, локальный черновик после полного входа не принят отдельным решением. |
| R083 | [источник 634–638](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:634) | Видимые ошибки | Принято | [01-product.md:1187](/Users/daniil/DesDoc/01-product.md:1187) | В форме или заметном блоке страницы, сохранение введённого. |
| R084 | [источник 639–664](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:639) | Архивирование журналов | Изменено | [01-product.md:1186](/Users/daniil/DesDoc/01-product.md:1186) | Автоматически по срокам, исходное удаляется после проверки архива; сроки ещё не выбраны. |
| R085 | [источник 665–675](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:665) | Страница входа и способы авторизации | Изменено | [01-product.md:522](/Users/daniil/DesDoc/01-product.md:522) | Общий логин/почта и пароль; восстановление и дизайн новой платформы, без бренда/пикселей WP. |
| R086 | [источник 676–694](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:676) | Ступени ограничения входа | Принято | [01-product.md:524](/Users/daniil/DesDoc/01-product.md:524) | 3 за 5 минут → 15 минут/час/сутки, пара IP + пользователь. |
| R087 | [источник 695–704](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:695) | Форма блокировки и серверный таймер | Принято | [03-design.md:1034](/Users/daniil/DesDoc/03-design.md:1034) | Остаток с сервера; оформление и тексты перерабатываются. |
| R088 | [источник 705–710](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:705) | Снятие блокировки и капча | Принято | [01-product.md:526](/Users/daniil/DesDoc/01-product.md:526) | Сброс по пользователю со всех адресов, аудит. |
| R089 | [источник 711–727](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:711) | Недоступная капча и защита логинов | Изменено | [01-product.md:530](/Users/daniil/DesDoc/01-product.md:530) | 8/30 в час на IP, не при закрытии задания; перечисление аккаунтов не раскрывается. |
| R090 | [источник 728–732](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:728) | Роли и авторство материалов | Изменено | [01-product.md:870](/Users/daniil/DesDoc/01-product.md:870) | Решения новой ролевой модели, не WP capability-копия. |
| R091 | [источник 733–736](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:733) | Видимость медиатеки | Изменено | [01-product.md:791](/Users/daniil/DesDoc/01-product.md:791) | Загрузки ученика отдельно; нет личного каталога загрузок; библиотека сотрудников перепроектируется. |
| R092 | [источник 737–742](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:737) | Предмет и учебник | Изменено | [01-product.md:1091](/Users/daniil/DesDoc/01-product.md:1091) | Каталог/тип статьи/экзаменационная редакция; внешний сайт отдельный. |
| R093 | [источник 743–750](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:743) | Публичный экзамен гостя без истории | Изменено | [01-product.md:776](/Users/daniil/DesDoc/01-product.md:776) | Публичное решение после регистрации; гость очного пробника получает промо-кабинет и историю. |
| R094 | [источник 751–754](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:751) | Сообщение Нашли ошибку от гостя | Изменено | [01-product.md:1185](/Users/daniil/DesDoc/01-product.md:1185) | Гостевой путь только для «Публичного сайта», комплектация не доведена, Q01. |
| R095 | [источник 755–762](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:755) | Навигация задач и узкий тренажёр | Перепроектирование | [03-design.md:37](/Users/daniil/DesDoc/03-design.md:37) | Адаптация принята; точные колонки/975 px не переносятся как обязательные. |
| R096 | [источник 763–772](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:763) | Масштаб и единицы измерения | Изменено | [03-design.md:99](/Users/daniil/DesDoc/03-design.md:99) | rem для текста, гибкая раскладка, 100% и 200% текста; отказ от общего масштабирования до 83%. |
| R097 | [источник 773–775](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:773) | Рекламная карточка курсов | Перепроектирование | [01-product.md:1072](/Users/daniil/DesDoc/01-product.md:1072) | Внешний сайт и каталог LMS разделены; старый рекламный блок не является требованием. |
| R098 | [источник 776–780](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:776) | Шрифты и внешние CDN | Принято | [01-product.md:1077](/Users/daniil/DesDoc/01-product.md:1077) | Системные или с домена LMS, без Google Fonts. |
| R099 | [источник 781–791](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:781) | Боты и автозаполнение | Изменено | [01-product.md:528](/Users/daniil/DesDoc/01-product.md:528) | Скорость сама по себе не блокирует; набор сигналов и безопасная диагностика. |
| R100 | [источник 792–818](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:792) | Комната группы, виртуальная трансляция и REC | Изменено | [01-product.md:822](/Users/daniil/DesDoc/01-product.md:822) | Виртуальный блок, запись по проведению, нет прогресса; плашка текущего занятия. |
| R101 | [источник 819–828](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:819) | Создание доменного аккаунта | Принято | [01-product.md:500](/Users/daniil/DesDoc/01-product.md:500) | Автоматически из офиса, иначе кнопкой; учебный доступ отдельно. |
| R102 | [источник 829–831](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:829) | Отключение и пароль домена | Принято | [01-product.md:504](/Users/daniil/DesDoc/01-product.md:504) | Последнее направление, повторное включение, общий пароль. |
| R103 | [источник 832–837](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:832) | Очередь и параметры AD | Принято | [01-product.md:506](/Users/daniil/DesDoc/01-product.md:506) | Повторы, профиль и отсутствие истечения пароля; транспорт — фиче-спека. |
| R104 | [источник 838–859](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:838) | Экзамен вне курса и роли | Изменено | [01-product.md:762](/Users/daniil/DesDoc/01-product.md:762) | Сеансы, утверждение, школьные отчёты; гостевой результат через аккаунт. |
| R105 | [источник 860–864](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:860) | Школьные ссылки и гостевые сеансы | Принято | [01-product.md:766](/Users/daniil/DesDoc/01-product.md:766) | Создаются вместе со школой, скидки/сеансы/отзыв и перевыпуск. |
| R106 | [источник 865–869](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:865) | Гость становится учеником | Изменено | [01-product.md:774](/Users/daniil/DesDoc/01-product.md:774) | Вместо внешней подписанной ссылки — заявка внутри того же аккаунта. |
| R107 | [источник 870–874](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:870) | Выгрузки и незаписавшиеся | Принято | [01-product.md:764](/Users/daniil/DesDoc/01-product.md:764) | Одинаковые фильтры, оба права экспорта. |
| R108 | [источник 875–882](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:875) | Вместимость, оплата, снимок, хранение | Изменено | [01-product.md:772](/Users/daniil/DesDoc/01-product.md:772) | Снимок и сроки закреплены; исторические фиксированные значения не переносятся. |
| R109 | [источник 883–889](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:883) | Самозапись в день экзамена | Принято | [01-product.md:762](/Users/daniil/DesDoc/01-product.md:762) | С полуночи закрыта; сотрудник может добавить и сверх вместимости. |
| R110 | [источник 890–895](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:890) | Исправления снимков и школьные результаты | Изменено | [01-product.md:780](/Users/daniil/DesDoc/01-product.md:780) | Исходная версия сохраняется, явная коррекция и пересчёт; нули и ОГЭ в отчёте. |
| R111 | [источник 896–959](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:896) | Повторные выводы для второй версии | Сводка | [01-product.md:652](/Users/daniil/DesDoc/01-product.md:652) | Все 20 выводов относятся к группам выше; новые правила не выводятся из повторов. |
| R112 | [источник 960–966](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:960) | Пожелание: лендинг из блоков | Отказ | [01-product.md:1074](/Users/daniil/DesDoc/01-product.md:1074) | Внешний сайт, LMS не строит лендинг. |
| R113 | [источник 967–968](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:967) | Пожелание: иерархия задач и статьи | Изменено | [01-product.md:1121](/Users/daniil/DesDoc/01-product.md:1121) | Статья одного типа, редакции и архивные форматы. |
| R114 | [источник 969–969](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:969) | Пожелание: LaTeX | Принято | [01-product.md:719](/Users/daniil/DesDoc/01-product.md:719) | Во всех rich-text, импорт/экспорт и редакции. |
| R115 | [источник 970–971](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:970) | Пожелание: публичный экзамен без входа | Изменено | [01-product.md:1129](/Users/daniil/DesDoc/01-product.md:1129) | Решение в тренажёре после регистрации; промо-доступ для гостя очного пробника. |
| R116 | [источник 972–974](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:972) | Пожелание: тренажёр и генератор | Позже, без срока | [01-product.md:1131](/Users/daniil/DesDoc/01-product.md:1131) | Интерактивный тренажёр принят; генератор позже, точный этап не назван релизом. |
| R117 | [источник 975–979](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:975) | Пожелание: факт отдельно от темы | Принято | [01-product.md:445](/Users/daniil/DesDoc/01-product.md:445) | Посещаемость и запись принадлежат проведению. |
| R118 | [источник 980–982](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:980) | Пожелание: несколько тем и продолжения | Принято | [01-product.md:443](/Users/daniil/DesDoc/01-product.md:443) | Многие ко многим; данные не теряются при исправлении тем. |
| R119 | [источник 983–986](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:983) | Пожелание: сообщения администратора | Принято | [01-product.md:602](/Users/daniil/DesDoc/01-product.md:602) | Адресный алерт, получатели и история, без переписки. |
| R120 | [источник 987–988](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:987) | Пожелание: социальные профили | Изменено | [01-product.md:951](/Users/daniil/DesDoc/01-product.md:951) | Одно направление, аватар/статус, медали; украшения не включены в начальную границу. |
| R121 | [источник 989–991](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:989) | Пожелание: кастомизация кабинета | Будущее | [01-product.md:945](/Users/daniil/DesDoc/01-product.md:945) | Дизайн и состав плиток ещё не приняты. |
| R122 | [источник 992–993](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:992) | Пожелание: геймификация | Изменено | [01-product.md:959](/Users/daniil/DesDoc/01-product.md:959) | Рейтинг, профили, достижения-медали; прочие механики не добавлены. |
| R123 | [источник 994–997](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:994) | Пожелание: rem/пиксели/тёмная тема | Изменено | [03-design.md:22](/Users/daniil/DesDoc/03-design.md:22) | Обе темы с первого компонента; запрет rem отклонён. |
| R124 | [источник 998–1001](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:998) | Пожелание: ветки, Docker, CI/CD | Изменено | [delivery.md:5](/Users/daniil/DesDoc/runbooks/delivery.md:5) | Vite сейчас; Docker при API/зависимостях; SHA-образы stage, затем прод без обязательных тегов. |
| R125 | [источник 1002–1003](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:1002) | Пожелание: blue-green | После релиза | [delivery.md:54](/Users/daniil/DesDoc/runbooks/delivery.md:54) | До первого релиза не реализуется. |
| R126 | [источник 1004–1005](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:1004) | Пожелание: канарейка | После релиза | [delivery.md:54](/Users/daniil/DesDoc/runbooks/delivery.md:54) | Аудитория и критерии выбираются позже. |
| R127 | [источник 1006–1007](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:1006) | Пожелание: кеш БД | После замеров | [02-tech.md:1409](/Users/daniil/DesDoc/02-tech.md:1409) | Точки подключения, без преждевременного кеша. |
| R128 | [источник 1008–1009](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:1008) | Пожелание: тестовые пользователи | Изменено | [01-product.md:961](/Users/daniil/DesDoc/01-product.md:961) | Виртуальные ученик/представитель, тестовые события без боевых последствий. |

## 4. Дополнительные решения из обсуждения

Эти решения расширяют или заменяют исходный ReleaseHistory. Их нельзя потерять, сверяя только старый файл.

| Решение | Текущая запись |
|---|---|
| Самопроверка 3 и общая настройка; эталон после завершения задачи | [01-product.md:741](/Users/daniil/DesDoc/01-product.md:741) |
| 5 прошлых редакций и общий лимит | [01-product.md:916](/Users/daniil/DesDoc/01-product.md:916) |
| Статья одного стабильного типа; формат/год/позиция и архив | [01-product.md:1121](/Users/daniil/DesDoc/01-product.md:1121) |
| Сайт отдельно, API тренажёра отдельно, единый аккаунт | [02-tech.md:1118](/Users/daniil/DesDoc/02-tech.md:1118) |
| Студенты одного направления, аватар/статус, медали | [01-product.md:951](/Users/daniil/DesDoc/01-product.md:951) |
| Состав выданной работы фиксируется с первого старта | [02-tech.md:638](/Users/daniil/DesDoc/02-tech.md:638) |
| Только сдача/проверка/возврат в ленте работ | [01-product.md:848](/Users/daniil/DesDoc/01-product.md:848) |
| Не все активности из v1 переносятся; служебный аудит отдельно | [02-tech.md:767](/Users/daniil/DesDoc/02-tech.md:767) |
| Частичные баллы включаются явно | [01-product.md:707](/Users/daniil/DesDoc/01-product.md:707) |
| Пустой урок-черновик допустим | [01-product.md:655](/Users/daniil/DesDoc/01-product.md:655) |
| Неготовый любой назначенный урок — уведомление за 2 часа; без темы исключение | [01-product.md:711](/Users/daniil/DesDoc/01-product.md:711) |
| Новые уроки планируются методистом отдельно по группам | [01-product.md:828](/Users/daniil/DesDoc/01-product.md:828) |
| Рейтинг объясним; предварительный без места; настройки после релиза | [01-product.md:953](/Users/daniil/DesDoc/01-product.md:953) |
| Восстановление архива не возвращает автоматически старый доступ | [01-product.md:512](/Users/daniil/DesDoc/01-product.md:512) |
| Гость пробника получает промо-кабинет, повышение сохраняет результат | [01-product.md:774](/Users/daniil/DesDoc/01-product.md:774) |
| Тестовая гостевая запись удаляется только без попытки/оплаты/отчёта | [01-product.md:770](/Users/daniil/DesDoc/01-product.md:770) |
| 90 дней простоя/год ученики и родители; 30/90 дней сотрудники | [01-product.md:534](/Users/daniil/DesDoc/01-product.md:534) |
| TOTP, почтовый фактор без подключённого приложения | [01-product.md:536](/Users/daniil/DesDoc/01-product.md:536) |
| Выдача нового пароля вместо показа, смена собственного в профиле | [01-product.md:542](/Users/daniil/DesDoc/01-product.md:542) |
| Активные устройства и отзыв сессий, без режима чужого компьютера | [03-design.md:1126](/Users/daniil/DesDoc/03-design.md:1126) |
| Маскированные контакты и аудит каждого раскрытия | [01-product.md:546](/Users/daniil/DesDoc/01-product.md:546) |
| Паспорт/ИНН/прописка шифруются ключами офисных компьютеров | [01-product.md:1035](/Users/daniil/DesDoc/01-product.md:1035) |
| Офисная веб-система, немедленная доставка и несколько ключей | [02-tech.md:1265](/Users/daniil/DesDoc/02-tech.md:1265) |
| Архив договоров и печать отдельно от LMS | [01-product.md:1037](/Users/daniil/DesDoc/01-product.md:1037) |
| Миграция банка/курсов/работ, без статей и прошлой учебной истории | [02-tech.md:1425](/Users/daniil/DesDoc/02-tech.md:1425) |
| Старые публичные номера/URL, внутренний ID отдельно | [01-product.md:894](/Users/daniil/DesDoc/01-product.md:894) |

## 5. Что действительно остаётся открытым

**Q01. Комплектация «Публичный сайт».** Гостевые сообщения об ошибках привязаны к инстансу с этим названием. В прайсовой модели по-прежнему только У1–У4, а SMM продаётся на всех уровнях. Нужно определить, это отдельная комплектация существующего уровня или новый уровень. Само решение ограничить гостевую отправку не пересматривается.

**Q02. Граница приёма и отдельного офиса.** Договоры и их база вынесены из LMS, но приём по-прежнему описан как конвейер с формированием/подписанием договора внутри платформы. Нужен способ фиксировать в LMS готовность договора и реквизиты для зачисления: вручную сотрудником или отдельным минимальным обменом. Общую базу договоров и запуск офисного приложения из LMS пользователь отверг — возвращать их нельзя.

**Q03. Возможность входящей доставки в офис.** В runbook от августа нет доступного входящего белого IP; актуальное состояние неизвестно. Нужны фактический доступный адрес/маршрут и схема размещения приёмника. Немедленная доставка принята; техническое решение не должно подменять её ежедневным опросом.

### Не новый продуктовый опрос, а детализация перед реализацией

- Auth: совместимый перенос прежних паролей, настройка/восстановление TOTP, модель сессий и немедленного отзыва, миграции auth_throttle.
- Офис: протокол и формат событий, управление ключами и допуском устройств, проверка восстановления, отдельное хранение и резервирование документов. Офисное приложение пока не имеет отдельной фиче-спеки.
- Импорт: происхождение материалов, контроль дубликатов, ремап курсов/работ/задач, сверка полноты и файлов. Импорт не тождественен запрещённому дублированию.
- Оценивание: точная матрица специализированных опросных шаблонов и остальных работ; конфигурация частей и согласование со шкалой предмета.
- Сроки: конкретные периоды хранения архивов журналов и данных завершивших экзамен гостей ещё не выбраны.
- Новые экраны: доступные устройства, TOTP, настройки уведомлений, предпросмотр/сценарии, локальная офисная система отсутствуют или не полностью покрыты старой картой UI.

### Сознательно отложено, не считать пропуском

- Blue-green и канареечная выкладка — после первого рабочего релиза.
- Серверный кеш — только после измерений; точки подключения сохраняются.
- Настройки источников/весов и видимости рейтинга — после релиза; формула не придумана аудитом.
- Генератор личных вариантов — развитие после основных функций тренажёра; точная дата относительно релиза не была согласована.
- Редактор таблиц как в Excel — после начальной вставки таблиц.
- Автоматические рекомендации статей — после ручного подбора.
- Журнал доступа к записям занятий — отложен.
- Компоновка кабинетов/плиток, оформление формул с перетаскиванием и медиатека — отдельная переработка дизайна; добавление украшений аватара не принято в начальный объём.

## 6. Статус мокапов

Обновление после исправлений: общий исторический статус опубликован в [Mockups/README.md](/Users/daniil/DesDoc/Mockups/README.md) и согласован с инструкциями разработчика.

В `Mockups/` найдено 34 HTML-файла: 33 экрана и `index.html`. По решению пользователя весь комплект требует переработки. Файлы не изменялись и не проверялись визуально. Старые демо-состояния не являются автоматически принятым поведением.

Текстовым поиском подтверждены конкретные устаревшие элементы:

| Мокап | Устаревшее содержимое |
|---|---|
| [01-course-builder.html](/Users/daniil/DesDoc/Mockups/01-course-builder.html) | дублирование |
| [02-player.html](/Users/daniil/DesDoc/Mockups/02-player.html) | старый плеер |
| [07-student.html](/Users/daniil/DesDoc/Mockups/07-student.html) | показ действующего пароля |
| [15-task-editor.html](/Users/daniil/DesDoc/Mockups/15-task-editor.html) | дублирование |
| [27-settings-system.html](/Users/daniil/DesDoc/Mockups/27-settings-system.html) | показ действующего пароля |

Для остальных отсутствие совпадения не доказывает актуальность. Прежде всего переработке подлежат конструктор, плеер, КТП/журнал с несколькими темами, главные, люди/доступ, приём, результаты и настройки. Новые дизайны не создавались в рамках сверки.

## 7. Индекс пунктов исходника

Каждый заголовок и выделенный пункт исходника связан с контрольной группой. Обычные подпункты и продолжения абзацев входят в её диапазон; это проверяемая адресация текста, а не автоматическое доказательство корректности требования.

| Строка | Пункт исходника | Группа |
|---|---|---|
| [1](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:1) | Что появилось в LMS после первого релиза | R001 |
| [10](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:10) | 1. Домашние работы: к чему пришли | R002 |
| [12](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:12) | Срок сдачи. Преподаватели почти никогда не ставят дедлайн руками. Если срока нет, | R002 |
| [16](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:16) | Просрочка. Запрет сдавать после срока себя не оправдал: ученик всё равно должен | R003 |
| [20](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:20) | Несданное ДЗ. Если к сроку ничего не сдано, работа не исчезает. У ученика, у родителя | R003 |
| [25](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:25) | Пересдача. Ученики хотят исправить ошибки, а не решать всё заново: | R004 |
| [32](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:32) | Опрос. Четвёртый тип работы рядом с практикой, самостоятельной и домашней. В него | R005 |
| [40](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:40) | Проверка ответов. | R006 |
| [45](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:45) | Проверка ответа до сдачи. В практике у ученика у заданий с текстовым ответом есть | R007 |
| [59](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:59) | Жёлтая отметка. Если задание в итоге решено верно, но в этой же сдаче ученик сначала | R008 |
| [65](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:65) | Время. Для каждой попытки записывается, сколько прошло от открытия работы до сдачи | R009 |
| [71](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:71) | Ошибка при сдаче. Если сдать не получилось, ученик видит понятное сообщение с кодом | R010 |
| [74](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:74) | 2. Решения и ответы: кто что видит | R011 |
| [76](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:76) | Преподаватель на занятии и автор курса видят эталон к каждому заданию: правильный | R011 |
| [78](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:78) | Отдельное поле «Решение для проверяющего» у заданий с ручной проверкой | R011 |
| [81](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:81) | Преподаватель на проверке работы под каждым заданием видит кнопку «Показать | R011 |
| [84](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:84) | Ученик видит решение только после того, как исчерпал попытки. | R012 |
| [85](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:85) | Код ученика в заданиях с кодом показывается преподавателю на проверке ровно | R012 |
| [87](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:87) | Тренажёр: у заданий с ручной проверкой кнопка «Показать ответ» открывает | R013 |
| [89](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:89) | Родитель открывает урок ребёнка и видит размытую страницу с пояснением, что | R014 |
| [92](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:92) | 3. Задания | R015 |
| [94](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:94) | Общее условие. Вводный текст, общий для нескольких вопросов, может быть у любого | R015 |
| [98](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:98) | Типовое условие (шаблон) при создании задания подставляется в те поля, в которых | R015 |
| [101](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:101) | Составные задания ЕГЭ 19–21 — одно условие и три вопроса. Каждый подпункт | R016 |
| [103](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:103) | Задание с кодом. Отдельное поле для кода программы ученика. | R017 |
| [104](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:104) | «Задание Робо» (робототехника). Поля ответа нет: ученик вставляет код программы, | R017 |
| [107](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:107) | Номера заданий платформа присваивает сама: номер задания ЕГЭ плюс порядковый | R018 |
| [109](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:109) | Дублирование задания. В редакторе задания есть кнопка «Дублировать задание»: серии | R019 |
| [115](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:115) | Импорт старой базы заданий из файла: с выбором категорий и обновлением уже | R020 |
| [117](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:117) | Знаки `<` и `>` в правильном ответе сохраняются и сравниваются как обычный текст. | R020 |
| [120](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:120) | Файлы к заданиям по кнопке скачиваются, а не открываются во вкладке. | R021 |
| [121](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:121) | Ответ файлом в «Развёрнутом ответе». Кроме картинок ученик может приложить архив | R021 |
| [123](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:123) | Редактор условия: вставка таблицы (в том числе копированием из Excel), блока кода | R022 |
| [125](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:125) | Банк заданий: фильтры по предмету, номеру задания, категориям и автору. | R022 |
| [127](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:127) | Новые возможности банка. У задания есть история редакций: изменение полей задания | R023 |
| [135](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:135) | 4. Курс и уроки | R024 |
| [137](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:137) | Урок-лекция: формулы, таблицы, листинги кода (с языком, номерами строк и кнопкой | R024 |
| [140](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:140) | Урок-черновик не открывается ученикам автоматически, даже если наступила его дата. | R025 |
| [141](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:141) | Подсказка в уроке: если работа закрыта, потому что не пройдены предыдущие шаги, | R025 |
| [143](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:143) | Контрольные: копировать условие нельзя, но вставлять в поле ответа можно. | R025 |
| [144](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:144) | Живой курс в плане группы: новый урок, добавленный в курс, сам встаёт на своё | R026 |
| [146](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:146) | «Продолжить тему»: если тему не успели, её вторая часть ставится следующим | R026 |
| [155](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:155) | Фактическое занятие неприкосновенно: если в журнале уже есть отметки, перестройка | R026 |
| [157](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:157) | Дублирование курса — два режима. «Только структуру»: копия ссылается на те же | R027 |
| [163](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:163) | Массовое добавление заданий в работу. Набирать работу по одному слоту долго, когда | R028 |
| [171](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:171) | Импорт из другого предмета. В курс по ОГЭ нужно вставить несколько уроков из Python, | R029 |
| [195](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:195) | Конструктор курса: правки после работы с реальными курсами | R030 |
| [197](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:197) | Добавление урока — на месте урока. Общая кнопка под деревом была неочевидной: | R030 |
| [201](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:201) | Длинная структура прокручивается. Дерево курса скроллится внутри своей панели, | R030 |
| [203](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:203) | Поиск заданий по цифрам — по началу номера. В конструкторах работ и экзаменов запрос | R030 |
| [207](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:207) | Удаление шага — с самого шага. Кнопка «Дублировать шаг» убрана: копия шага | R031 |
| [213](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:213) | Меню «Добавить шаг»: типы шагов в фиксированном порядке (1.1.72). Лекция, | R031 |
| [221](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:221) | Плеер урока: одна страница — один урок | R032 |
| [229](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:229) | урок — самостоятельная страница. По курсу ходят со страницы курса в кабинете, | R032 |
| [231](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:231) | шаги — колонка квадратов-номеров слева, цвет — тип шага. По наведению — | R032 |
| [234](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:234) | кнопок «Назад / Далее» нет. Обязательны только шаги, которые сдаются кнопкой: | R032 |
| [238](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:238) | шапка ведёт себя как у сайта: прячется при прокрутке вниз и возвращается при | R032 |
| [246](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:246) | Урок ещё закрыт по времени. Ученик, который открыл урок до начала занятия, видит | R033 |
| [251](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:251) | Два режима просмотра без ученика. Они похожи, но решают разные задачи, поэтому | R034 |
| [285](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:285) | Трансляция занятия: до и после | R035 |
| [300](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:300) | Задания банка без «пустых строк» | R036 |
| [308](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:308) | Экзамены в эмуляторе КЕГЭ/КОГЭ: любое задание на любую позицию | R037 |
| [322](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:322) | в навигаторе и листе результатов — номер задания, а не место в работе: на | R037 |
| [325](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:325) | внешний вид и формат ответа (сколько ячеек, таблица, файл), эталон и баллы | R037 |
| [329](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:329) | Баллы всегда 29 первичных и 100 вторичных. В работе может быть сколько угодно | R038 |
| [335](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:335) | Лист результатов — как на реальной станции: строка на задание, а не на позицию | R039 |
| [341](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:341) | Результат экзамена ученик видит только после «Утвердить работу». До этого и на | R040 |
| [351](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:351) | Самостоятельные курсы | R041 |
| [361](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:361) | 5. Журнал посещаемости | R042 |
| [367](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:367) | Занятие и тема — разные вещи (требование ко второй версии). В первой версии | R043 |
| [371](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:371) | Занятие — физическое проведение. Оно одно, всегда есть в расписании независимо от | R043 |
| [374](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:374) | Тема — урок из курса, который прикрепляется к занятию. Это отдельная сущность: | R043 |
| [377](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:377) | Сдачи работ привязаны к занятию, а не к теме: результат, решённое и нерешённое | R043 |
| [380](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:380) | В КТП занятия-слоты есть всегда, пустой слот подписан «Без темы» (знакомство, зачёт). | R043 |
| [382](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:382) | Тема на занятом слоте — вопрос преподавателю: «Добавить к теме» или «Заменить»: темы | R043 |
| [385](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:385) | Результаты продолженной темы общие для всех её занятий, а в журнале показываются в колонке | R043 |
| [387](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:387) | Номер и прогресс программы считают темы, а не занятия: «тема 12 из 40», продолжение | R043 |
| [389](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:389) | Индивидуальное занятие — тоже слот с одной темой; слот и тема выбираются одновременно, при | R043 |
| [393](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:393) | Выбор группы и дополнительные занятия. При открытии журнала автоматически | R044 |
| [397](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:397) | Академические каникулы. Каникулы задаются в учебном календаре и учитываются при | R045 |
| [400](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:400) | 6. Личный кабинет преподавателя | R046 |
| [402](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:402) | Главная: две плитки — «Занятий сегодня» и «На проверке», — под ними расписание | R046 |
| [408](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:408) | Экран проверки работы: в шапке страницы — ФИО сдавшего ученика (по снимку записи | R047 |
| [410](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:410) | «Засчитать работу» целиком. Кроме зачёта отдельных заданий преподаватель может | R048 |
| [415](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:415) | Сводка по ученику: выбор «направление → группа → ученик» или поиск по ФИО | R049 |
| [418](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:418) | Работы: один список работ прошедших занятий, сверху самые свежие; грузится порциями | R050 |
| [429](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:429) | Новая вкладка и «Назад». Пункты меню, группы и курсы сайдбара, занятия КТП, ученики, | R051 |
| [435](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:435) | КТП и расписание: | R052 |
| [459](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:459) | Активность: вкладки «Лента событий» (сдачи, попытки, оценки), «Решения задач» | R053 |
| [463](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:463) | Адрес кабинета запоминает экран. Ссылка вида `?screen=…&course=…` не «залипает»: | R054 |
| [467](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:467) | Страница курса: клик по курсу в «Моих курсах» открывает ту же программу, что | R055 |
| [476](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:476) | Главное меню сворачивается так же, как «Мои группы» и «Мои курсы»: у всех трёх | R056 |
| [480](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:480) | Дополнительное занятие в КТП открывается по клику на карточку — в плеер, как обычная | R057 |
| [486](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:486) | 7. Личный кабинет ученика и родителя | R058 |
| [488](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:488) | Посещаемость по занятиям: группа, дата, тема и работы занятия. | R058 |
| [489](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:489) | «Мои курсы»: свежее сверху. Модули и уроки идут в обратном порядке — последний | R059 |
| [495](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:495) | «Мои оценки»: работы сгруппированы по занятиям, клик ведёт прямо в работу. | R060 |
| [498](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:498) | Дедлайны: сначала предстоящие, потом просроченные. | R061 |
| [499](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:499) | Телефон: кабинет и плеер урока адаптированы под узкий экран — меню выезжает, | R062 |
| [503](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:503) | «К курсу» из урока возвращает на страницу этого же курса, а не на главную | R062 |
| [506](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:506) | Главная кабинета ученика и родителя. Разделы и плитки можно переставлять, | R063 |
| [512](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:512) | Рейтинг по предмету. Из плитки ученик переходит к таблице, где выделена его строка. | R064 |
| [518](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:518) | 8. Уведомления: какие правила прижились | R065 |
| [520](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:520) | Преподавателю: сдана работа, нужна проверка; новый ученик в группе; курс обновился | R065 |
| [523](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:523) | Ученику и родителю: | R065 |
| [530](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:530) | Администратору платформы (сигналы, из-за которых надо действовать): | R065 |
| [538](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:538) | Важные уведомления закрепляются. Часть плиток ученику слишком важна, чтобы остаться | R066 |
| [545](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:545) | Оповещения по моменту старта экзамена. Ученику и гостю текст на экране экзамена | R067 |
| [558](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:558) | 9. Заявки и зачисление | R070 |
| [560](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:560) | Путь семьи: ученик заполняет заявку и подтверждает почту кодом. Родитель получает | R070 |
| [562](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:562) | Ссылка для родителя действует 72 часа с момента, когда администратор её скопировал. | R071 |
| [564](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:564) | Срок заявки — 20 дней, отдельно от срока ссылки. Заявка, которую родитель уже | R071 |
| [566](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:566) | Временный доступ: ученик может заниматься в группе до оформления договора. | R071 |
| [569](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:569) | Окно заявки открывается действием «Просмотреть» (раньше — «Изменить»: в нём чаще | R072 |
| [572](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:572) | Проверки при регистрации: логин уникален, в том числе среди незавершённых заявок; | R072 |
| [574](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:574) | Анкета родителя: подсказки ФИО, «кем выдан» и адреса; ссылка «Узнать ИНН»; | R072 |
| [577](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:577) | Восстановление ученика из архива создаёт недостающие учётные записи. | R073 |
| [578](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:578) | Поиск по ФИО в списках учеников и родителей (родителя можно найти по ФИО ребёнка). | R074 |
| [581](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:581) | Выгрузки учеников и родителей связываются ключами: у ученика есть «ID родителя», | R075 |
| [585](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:585) | Поле «Школа» в заявке подсказывает школы Калининграда: «школа 24», «50», «лицей 18» | R077 |
| [590](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:590) | 10. Центр печати документов | R078 |
| [594](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:594) | Договор и согласие на обработку персональных данных — по шаблонам Word | R078 |
| [596](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:596) | Справка для налогового вычета по официальной форме. Номер, год и сумма вводятся | R078 |
| [599](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:599) | Программы и цены по предметам подставляются в договор. | R078 |
| [603](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:603) | 11. Журналы для разбора проблем | R079 |
| [607](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:607) | Ошибки: любой отказ или сбой, который увидел пользователь, с кодом и номером | R079 |
| [611](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:611) | Вход: почему не удалось войти — нет такого логина, неверный пароль, пароль | R079 |
| [615](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:615) | Ссылка для родителя: кто открыл ссылку (человек с какого устройства или | R080 |
| [619](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:619) | Форма заявки: то же, что и для анкеты родителя, но до отправки кода — начал | R080 |
| [623](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:623) | Найденные ошибки: сообщения «Нашли ошибку?» со страниц заданий и статей: что | R081 |
| [625](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:625) | Зачисления: все действия с заявками и учениками, печать документов, операции | R081 |
| [628](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:628) | Истёкшая сессия не ломает действие. Защитный токен запроса живёт сутки и меняется | R082 |
| [634](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:634) | Сообщение об ошибке стоит там, где его видно. Ошибка действия на странице | R083 |
| [639](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:639) | Архив журналов: скачать и очистить. Журналы входа, действий, экзаменов и лента | R084 |
| [644](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:644) | Что попадает в архив. Журналы «Действия», «Аутентификация» и «Экзамены» — записи | R084 |
| [649](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:649) | Что скачивается. ZIP: по одному CSV на журнал и файл `manifest.json` (версия | R084 |
| [652](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:652) | Очистка. Кнопка «Очистить журналы» недоступна, пока архив не скачан, и перед | R084 |
| [656](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:656) | Возврат записей. Команда на сервере: `wp fs-lms logs import архив.zip`. Записи | R084 |
| [658](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:658) | След. Факт скачивания и очистки (сколько записей по каждому журналу) пишется в | R084 |
| [665](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:665) | 12. Вход и безопасность | R085 |
| [676](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:676) | Ступенчатая блокировка входа, как на телефоне. Сначала была одна фиксированная | R086 |
| [695](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:695) | Закрытая форма выглядит закрытой. После блокировки поля, «глазок» пароля и кнопка | R087 |
| [705](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:705) | Администратор снимает блокировку сам. В карточке ученика, родителя и преподавателя есть кнопка | R088 |
| [711](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:711) | Капча и VPN. Задание Яндекса из части сетей не открывается (VPN, блокировщик | R089 |
| [728](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:728) | 13. Роли | R090 |
| [733](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:733) | Медиатека. Преподаватели, методисты и офис видят все загруженные файлы. Ученик и родитель при выборе файла | R091 |
| [737](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:737) | 14. Публичная часть сайта | R092 |
| [739](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:739) | Страница предмета с разделами: тренажёр, учебник, курсы, экзамены. | R092 |
| [740](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:740) | Учебник: каталог статей по номерам заданий ЕГЭ с фильтрами и поиском. В статью | R092 |
| [743](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:743) | Публичные экзамены ЕГЭ: гость проходит полный вариант в интерфейсе, похожем | R093 |
| [751](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:751) | «Нашли ошибку?» На странице задания и в статье (над навигацией по серии) стоит | R094 |
| [755](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:755) | Страница задания: карточки сайдбара и навигации «предыдущее / все задания / | R095 |
| [757](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:757) | Тренажёр на телефоне: фильтры убраны под кнопку, карточки в одну колонку. | R095 |
| [758](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:758) | Тренажёр в окне на пол-экрана. Его часто открывают рядом с редактором кода, | R095 |
| [763](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:763) | Масштаб страницы. Перепробовали три схемы. Сайт, уменьшающийся целиком вместе | R096 |
| [773](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:773) | Блок «Курсы» в сайдбаре пока рекламирует программу подготовки к ЕГЭ/ОГЭ | R097 |
| [776](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:776) | Шрифты только с домена сайта. Google Fonts не подключаются нигде, включая кабинет, | R098 |
| [781](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:781) | Заявки с форм сайта и боты. На главной приходили заявки «только имя + телефон» из | R099 |
| [792](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:792) | Трансляция занятия живёт в группе, а не в курсе. Шаг «Трансляция» с ссылкой в курсе не | R100 |
| [819](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:819) | 15. Интеграция с доменом офиса | R101 |
| [838](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:838) | 16. Экзамены вне курса | R104 |
| [842](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:842) | Ученик. В «Мои экзамены» видны ближайшие проведения, можно записаться на сеанс, перенести или отменить запись. | R104 |
| [846](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:846) | Родитель. Видит экзамены и результаты ребёнка (переключатель детей), записать, перенести или отменить за ребёнка не может. | R104 |
| [848](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:848) | Преподаватель. Назначает проведение и сеансы, видит доску сеанса (кто пришёл, начал, сдал, не явился), может | R104 |
| [852](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:852) | Гость. Не ученик центра: записывается по ссылке школы, платит через магазин и получает место. Сотрудник | R104 |
| [856](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:856) | Школы. Сотрудник собирает именованный отчёт из согласившихся гостей и учеников с утверждённым результатом и отдаёт | R104 |
| [860](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:860) | Ссылки школ и сеансы только для гостей. Ссылки собраны в отдельной панели «Управление ссылками» рядом с настройками провед… | R105 |
| [865](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:865) | Ссылка на форму заявки для гостя. В «Пользователи» → «Гости экзамена» под ФИО есть ссылка «Выдать ссылку»: она копирует ад… | R106 |
| [869](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:869) | Проведение экзамена: выгрузка и незаписавшиеся. «CSV» и «Печать списка» берут только строки, видимые под текущими фильтрам… | R106 |
| [874](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:874) | Правила. | R107 |
| [883](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:883) | Запись в день экзамена. Самозапись гостей закрывается с полуночи дня сеанса. | R109 |
| [888](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:888) | Снимок варианта и правки заданий. До начала проведения изменения варианта | R109 |
| [893](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:893) | Отчёт для школы. Таблица и CSV сохраняют нулевой результат и оценку ОГЭ. | R110 |
| [896](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:896) | Выводы для второй версии | R111 |
| [898](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:898) | 1. Срок ДЗ считается от расписания, а не выставляется вручную. Просрочка — это | R111 |
| [900](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:900) | 2. Пересдача сохраняет прогресс: засчитанное не перепроверяется, лимит попыток | R111 |
| [902](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:902) | 3. Эталон решения — отдельная сущность с явными правилами: преподавателю видно | R111 |
| [905](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:905) | 4. Типы заданий расширяются (код, «Робо», составные, общее условие), нужна гибкая | R111 |
| [907](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:907) | 5. План группы живой: курс меняется в процессе, факт занятия защищён от | R111 |
| [909](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:909) | 6. Уведомления — это правила с задержками, отзывом и сериями, у администратора | R111 |
| [911](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:911) | 7. Журналы с первого дня: вход, публичные формы, ошибки. Без них жалобы вида | R111 |
| [913](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:913) | 8. Документы для семьи (договор, согласие, справка на вычет) — постоянная | R111 |
| [915](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:915) | 9. Учитывать реальную сеть: в школе много людей выходят с одного адреса, поэтому | R111 |
| [917](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:917) | 10. Режимы плеера разведены по задачам: предпросмотр — проверить содержимое курса | R111 |
| [920](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:920) | 11. Самопроверка до сдачи — отдельное действие, не сдача: у неё свой лимит, свой след | R111 |
| [923](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:923) | 12. Тестовые данные нужно уметь стирать целиком. Проверка формы записи по ссылкам | R111 |
| [927](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:927) | 13. Ссылка — часть записи о школе, а не отдельный шаг. Отдельная кнопка «Создать ссылку» и отзыв рядом с перевыпуском пута… | R111 |
| [930](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:930) | 14. Ширину колонки считать в пикселях, если тема масштабирует корень шрифта. В `rem` «1200» превращалась в 1538 на FullHD;… | R111 |
| [932](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:932) | 15. Один акцентный цвет во всех частях интерфейса. Общие компоненты (окна | R111 |
| [936](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:936) | 16. У журналов должен быть срок жизни с первого дня. Таблицы входа, действий, | R111 |
| [943](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:943) | 17. Пауза после неверного пароля должна расти, а у администратора должна быть кнопка | R111 |
| [951](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:951) | 18. Развести редактируемый банк и выданный экзамен. Для воспроизводимости | R111 |
| [954](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:954) | 19. Рейтинг должен объяснять итог. Ученик видит вклад каждого источника и доступный | R111 |
| [956](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:956) | 20. Самостоятельное прохождение требует своей модели доступа. Ученик начинает | R111 |
| [960](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:960) | Пожелания к FS LMS 2, собранные после релиза | R112 |
| [962](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:962) | Сайт и учебный контент | R112 |
| [964](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:964) | Лендинг из готовых блоков. Сохранить привычный сценарий настройки темы: редактор | R112 |
| [967](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:967) | Банк заданий и учебник. Задать иерархию типов заданий и связь с соответствующими | R113 |
| [969](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:969) | LaTeX. Встроить поддержку формул в редактор и отображение учебного контента. | R114 |
| [970](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:970) | Публичные экзамены. Перенести возможность пройти полный экзаменационный вариант | R115 |
| [972](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:972) | Тренажёр и генератор вариантов. Перенести существующий тренажёр и предусмотреть | R116 |
| [975](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:975) | Расписание и факт проведения | R117 |
| [983](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:983) | Кабинет и интерфейс | R119 |
| [985](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:985) | Сообщения от администратора. Дать администратору возможность отправлять сообщения | R119 |
| [987](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:987) | Социальные профили. Взять GitHub и Steam как ориентиры для профилей с аватарами, | R120 |
| [989](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:989) | Кастомизация профиля. Дать пользователю настраивать меню и главную кабинета. | R121 |
| [992](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:992) | Геймификация. Расширить её за пределы предметного рейтинга. Конкретные механики | R122 |
| [994](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:994) | Адаптивность и оформление. Использовать целые пиксели в размерах интерфейса, | R123 |
| [998](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:998) | Разработка и эксплуатация | R124 |
| [1000](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:1000) | Ветки и окружения. Рабочую ветку запускать в локальном Docker, а изменения из | R124 |
| [1002](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:1002) | Blue-green deployment. Поддержать переключение между двумя окружениями с | R125 |
| [1004](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:1004) | Канареечное развёртывание. Поддержать постепенную выдачу новой версии части | R126 |
| [1006](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:1006) | Кеширование запросов к БД. Предусмотреть повторное использование результатов | R127 |
| [1008](/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md:1008) | Тестовые пользователи. Предусмотреть фантомного ученика и тестовых пользователей | R128 |

## 8. Следующий проход

1. Согласовать Q01–Q03 без возврата к уже отвергнутой общей базе договоров или старому гостевому тренажёру без аккаунта.
2. Подготовить auth-фиче-спеку: физическая схема, совместимость прежних паролей, второй фактор, сессии и отзыв.
3. После Q02/Q03 детализировать офисную систему и протокол доставки.
4. Перерабатывать экраны по заново согласованным макетам, не повторять отменённые возможности исторического HTML.

## 9. Снимок до исправлений

Контрольные суммы сохраняют исходный снимок сверки, до этого прохода исправлений. Текущий снимок изменённых документов приведён ниже. Ссылки в тексте пересчитаны на актуальные строки; прежние формулировки описаны в наблюдениях как история.

| Файл | Строк | SHA-256 |
|---|---:|---|
| `/Users/daniil/FS-LMS/wordpress/wp-content/plugins/fs-lms/.docs/ReleaseHistory_1.0.x.md` | 1009 | `c5cf4721a236f2b5f6582e4c6d65b063214d5782f3ed003c989f853db0e531b9` |
| `/Users/daniil/DesDoc/01-product.md` | 1274 | `7b76f0bf109e03e30f2d705dc434ca21f463a058052a60cc59e7b66f05e3cd70` |
| `/Users/daniil/DesDoc/02-tech.md` | 1473 | `4f32205152908568f19f6a7d1d8366adaa5495de3040611d93663db8336348fa` |
| `/Users/daniil/DesDoc/03-design.md` | 1371 | `48c014c9884af7688613357833f924753526f9425d7b9d9ae9d67c67b90505ee` |
| `/Users/daniil/DesDoc/04-conventions.md` | 752 | `09e9388dab7d050ceb1e8aeca5ddce4939fbc74cfe64c638d40e7138cf301da2` |
| `/Users/daniil/DesDoc/ui-kit/ui-plan.md` | 201 | `19301f9f9ab06b552c029f0c6938810fe27767c4c03f5525570f5f8865461d52` |
| `/Users/daniil/DesDoc/specs/001-karkas-monorepo.md` | 189 | `e25415fd40ad23ed16478e53cc56b31f386b6291a4f09b972c7667b8cf29df2a` |
| `/Users/daniil/DesDoc/runbooks/delivery.md` | 58 | `1ea964df471b69873d062941facf5dd84ab62232e25bec2b6538d0ab247c03e9` |
| `/Users/daniil/DesDoc/runbooks/stage.md` | 452 | `2196a833325341a6c64e1816ebf1b499c51c5809c86e268c48de96cce2d20a62` |
| `/Users/daniil/DesDoc/runbooks/vpn.md` | 75 | `e4c32983af7e1f9af8c79806e18f9b08531ea3911b51f397072a5054baa31655` |
| `/Users/daniil/DesDoc/AGENTS.md` | 57 | `ea01acb895997332539fb1935086d65c542d36dfab858754696894813c328d23` |

## 10. Проверка исправлений

Дата: 19 ноября 2026. Изменялись только документация и её инструкции; продуктовый код, Git, окружения и исторический HTML не затронуты.

Проверено: отсутствие отменённых положительных правил дублирования, блокировки лишь после сдачи, модели «занятие = один урок», безусловного разбора после сдачи, password_enc в каркасной спеке, обязательной установки нового пароля импортированным, старого минимального времени лекции и fallback IMAGE_TAG на latest. Номера подробных разделов §4 уникальны; ссылки auth и уведомлений разделены. Локальные ссылки проверены на существование файла и допустимый номер строки. Матрица из 128 групп и индекс из 214 пунктов сохранены.

### Снимок изменённых документов после правок

| Файл | Строк | SHA-256 |
|---|---:|---|
| `/Users/daniil/DesDoc/01-product.md` | 1276 | `95b94b6b29b416fda5cdf9e37797b2e49e7544df1ac8c92acf06010bec89fd79` |
| `/Users/daniil/DesDoc/02-tech.md` | 1473 | `6ab3f0bb561315f4f46e5e2db5e25b26eace4aa6c41f06ae995f522a2553a628` |
| `/Users/daniil/DesDoc/03-design.md` | 1371 | `7c4f72354b721126e256fb8c816322055772f14544fc0f5e2ef7d48ea6c7988e` |
| `/Users/daniil/DesDoc/04-conventions.md` | 752 | `f6be9eb1929d65636294ad087274a3184d47931a7cf20bdad76f2147a629163b` |
| `/Users/daniil/DesDoc/AGENTS.md` | 57 | `4c016f87ed6e53745e40fc068cca30b8590e79779bc5fee9b55b5051b75232d6` |
| `/Users/daniil/DesDoc/CLAUDE.md` | 57 | `44d98b15bdf1f145d081a0c235c61ce452bc04d21ce19e26a6a7cde89214b2c8` |
| `/Users/daniil/DesDoc/Mockups/README.md` | 7 | `fe1cccf08489e5fb494176406d675f7982fcbe441cb1053557e1854f3a656624` |
| `/Users/daniil/DesDoc/runbooks/stage.md` | 452 | `14ae6be93e20b42e3aaeaa7097b544228b67c98fe85e09858bdd9ce5c6f277f9` |
| `/Users/daniil/DesDoc/specs/001-karkas-monorepo.md` | 189 | `87879b3b0ba529f98480f6429e6aa2fb46669f6f23f58c278b8b0d3ec2803f0f` |
| `/Users/daniil/DesDoc/ui-kit/ui-plan.md` | 201 | `a4f60290f55da1cbc13ebc9412d772a80ef34f6e5603f8c5b822ac107da15a1f` |
