/**
 * FS-LMS 2.0 — тема Mantine (источник: 03-design §1.13–1.14, §8.2; ui-kit/variables.scss).
 *
 * Палитра мокапов — open-color, штатная палитра Mantine, поэтому цвета
 * не переопределяются: достаточно primaryColor + primaryShade. Правки темы —
 * только шкалы (§1.13) и defaultProps; произвольных чисел в компонентах нет.
 *
 * При постановке репозитория файл переезжает в пакет `ui` (02-tech §11.2)
 * как единственный источник размеров; variables.scss подключается глобально
 * (каркас и сеточные компоненты читают var(--…) напрямую).
 */
import { createTheme, rem } from '@mantine/core';

/** Цвета типов шагов (03-design §1.14) — те же значения, что --step-* в variables.scss. */
export const stepColors = {
  text: '#228be6',   // текст      — blue.6
  task: '#2f9e44',   // задача     — green.8
  video: '#7950f2',  // видео      — violet.6
  stream: '#e64980', // трансляция — pink.6
  work: '#e8590c',   // работа     — orange.8
  exam: '#e03131',   // экзамен    — red.8
} as const;

/**
 * Семантика StatusBadge (03-design §1.9, §8.4): один компонент и одна палитра
 * на весь продукт; значение статуса продукта мапится в одну из пяти пар
 * «светлый фон (.0) + тёмный текст». Тексты — из i18n-глоссария, не отсюда.
 */
export const statusPalette = {
  draft: { bg: 'var(--gray1)', fg: 'var(--gray7)' },     // черновик, в работе
  ok: { bg: 'var(--green-l)', fg: '#2b8a3e' },           // составлен, утверждено, зачтено, оплачено
  warn: { bg: 'var(--orange-l)', fg: '#d9480f' },        // просрочено, не заполнено, ожидает
  info: { bg: 'var(--blue-l)', fg: '#1864ab' },          // на проверке, запланировано
  special: { bg: 'var(--violet-l)', fg: 'var(--violet)' }, // замена, режим педагога
} as const;

export const theme = createTheme({
  /* Палитра — дефолтная (open-color). Синий продукта = blue.6. */
  primaryColor: 'blue',
  primaryShade: 6,

  /* Шрифт — системный стек, дефолт Mantine не трогаем. */

  /* Типографика §1.13: 12 · 14 (базовый) · 16 · 22 · 26.
     Промежуточных 18/20 в системе нет намеренно — lg/xl отданы цифрам
     показателей; 32 живёт только в BalanceCard/KpiTile через var(--fs-32). */
  fontSizes: {
    xs: rem(12),
    sm: rem(14),
    md: rem(16),
    lg: rem(22),
    xl: rem(26),
  },

  /* Отступы: именованные пять ступеней; остальные (6/20/32/40/48/60) —
     CSS-переменные каркаса, в пропсы компонентов не переезжают. */
  spacing: {
    xs: rem(4),
    sm: rem(8),
    md: rem(12),
    lg: rem(16),
    xl: rem(24),
  },

  /* Скругления §1.13: 4 метки · 6 клетки · 8 кнопки и поля (default) ·
     12 карточки · 20 pill. Модалка 14 — defaultProps ниже. */
  radius: {
    xs: rem(4),
    sm: rem(6),
    md: rem(8),
    lg: rem(12),
    xl: rem(20),
  },
  defaultRadius: 'md',

  shadows: {
    xs: '0 1px 3px rgba(0, 0, 0, .06)', // --sh: карточки, плашки переключателей
  },

  headings: {
    /* Заголовок экрана — fs-16/600 (§2.1.2: h1 в шапке); крупнее — только цифры. */
    sizes: {
      h1: { fontSize: rem(16), fontWeight: '600' },
      h2: { fontSize: rem(16), fontWeight: '600' },
      h3: { fontSize: rem(14), fontWeight: '600' },
    },
  },

  components: {
    /* Базовый текст интерфейса — 14 (sm), а не md. */
    Text: { defaultProps: { size: 'sm' } },
    Button: { defaultProps: { size: 'sm' } },
    TextInput: { defaultProps: { size: 'sm' } },
    NumberInput: { defaultProps: { size: 'sm' } },
    Textarea: { defaultProps: { size: 'sm' } },
    Select: { defaultProps: { size: 'sm' } },
    Checkbox: { defaultProps: { size: 'sm' } },
    Radio: { defaultProps: { size: 'sm' } },
    Switch: { defaultProps: { size: 'sm' } },
    SegmentedControl: { defaultProps: { size: 'sm' } },
    Table: { defaultProps: { fz: 'sm' } },

    /* Модалка — r-14 (§1.7); вложенные модалки запрещены — из модалки только
       к дроверу или закрытию. */
    Modal: { defaultProps: { radius: rem(14), centered: true } },

    /* Дровер — боковая панель 390px (§1.7). */
    Drawer: { defaultProps: { position: 'right', size: rem(390) } },

    /* Бейджи — pill (radius.xl = 20), fs-12/600 (§1.9). */
    Badge: { defaultProps: { radius: 'xl', size: 'md' } },

    /* Карточка-секция: r-12, тень xs (§8.4 SectionCard). */
    Paper: { defaultProps: { radius: 'lg', shadow: 'xs' } },

    /* Тултипы — только пояснения (§1.7); подсказки с данными — компонент Tip. */
    Tooltip: { defaultProps: { openDelay: 300, withArrow: true } },

    /* Скелетоны на списках, спиннер не длиннее секунды (§1.10). */
    Skeleton: { defaultProps: { radius: 'sm' } },
  },

  /* Прочие константы каркаса и сеток компоненты читают из variables.scss:
     var(--head-h), var(--col-300), var(--sq) и т. д. — см. 03-design §8.2. */
});
