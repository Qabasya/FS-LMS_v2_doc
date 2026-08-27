/* FS-LMS 2.0 — типы шагов: единый набор иконок и цветов для всех мокапов.
   Форма иконки одна и та же везде; меняется только режим окраски:
     mono=false — линия цветом типа (плитки в конструкторе и плеере),
     mono=true  — currentColor (белым по цветному квадрату прогресса).           */
var STEP_TYPES = {
  text: {
    n:'Лекция', c:'#228be6', bg:'#e7f5ff',
    p:'<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/>'
  },
  task: {
    n:'Задача', c:'#2f9e44', bg:'#ebfbee',
    p:'<circle cx="12" cy="12" r="9"/><path d="M9.6 9.4a2.5 2.5 0 1 1 3.2 2.4c-.6.2-.9.7-.9 1.3v.5"/>',
    f:'<circle cx="11.9" cy="16.6" r="1.15"/>'
  },
  video: {
    n:'Видео', c:'#7950f2', bg:'#f3f0ff',
    p:'<rect x="3" y="5" width="18" height="14" rx="2.5"/>',
    f:'<path d="M10.4 8.9 16 12l-5.6 3.1z"/>'
  },
  live: {
    n:'Трансляция', c:'#e64980', bg:'#fff0f6',
    p:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4.6"/>',
    f:'<circle cx="12" cy="12" r="1.5"/>'
  },
  work: {
    n:'Работа', c:'#e8590c', bg:'#fff4e6',
    p:'<path d="M9.2 7.5 4.4 12l4.8 4.5"/><path d="M14.8 7.5 19.6 12l-4.8 4.5"/>'
  },
  exam: {
    n:'Экзамен', c:'#e03131', bg:'#fff5f5',
    p:'<path d="M4 7h8"/><path d="M4 12h6"/><path d="M4 17h6"/><path d="m13.6 15.4 2.2 2.2 4.4-4.8"/>'
  }
};

/* SVG-иконка типа шага. mono=true — наследует цвет текста (белый на цветной клетке) */
function stepIcon(type, size, mono){
  var d = STEP_TYPES[type] || STEP_TYPES.text, s = size || 18;
  var col = mono ? 'currentColor' : d.c;
  return '<svg class="si" viewBox="0 0 24 24" width="'+s+'" height="'+s+'" fill="none" stroke="'+col+'" ' +
    'stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    d.p + (d.f ? '<g fill="'+col+'" stroke="none">'+d.f+'</g>' : '') + '</svg>';
}
function stepName(type){ return (STEP_TYPES[type] || STEP_TYPES.text).n; }
function stepColor(type){ return (STEP_TYPES[type] || STEP_TYPES.text).c; }
function stepBg(type){ return (STEP_TYPES[type] || STEP_TYPES.text).bg; }
