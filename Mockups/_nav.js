/* FS-LMS 2.0 — демо-навигация по мокапам.
   В продукте её нет: переходы между экранами идут по данным (03-design §3.10).
   Здесь это единственный способ попасть на любой экран, не возвращаясь в индекс. */
var SCREENS = [
  ['Оглавление',            'index.html'],
  ['— Вход —',              ''],
  ['Вход и регистрация',    '28-auth.html'],
  ['Служебные страницы',    '29-service.html'],
  ['Письма',                '30-emails.html'],
  ['— Управление —',        ''],
  ['Главная сотрудника',    '10-home.html'],
  ['Журнал',                '04-journal.html'],
  ['Группы и ученики',      '07-student.html#pick'],
  ['Карточка группы',       '20-group.html'],
  ['Ученики и представители','22-people.html'],
  ['Приём и заявки',        '23-admission.html'],
  ['Лицевые счета (админ)', '24-finance.html'],
  ['Сотрудники и роли',     '21-staff.html'],
  ['Урок по группе',        '08-lesson.html#pick'],
  ['Работа по группе',      '09-work.html#pick'],
  ['Проверка работ',        '05-review.html'],
  ['КТП и расписание',      '03-ktp.html'],
  ['Индивидуальные занятия','06-individual.html'],
  ['Витрина: карточки',     '25-storefront.html'],
  ['Настройки обучения',    '26-settings-learning.html'],
  ['Настройки системы',     '27-settings-system.html'],
  ['— Публичная часть —',   ''],
  ['Сайт и каталог',        '31-public.html'],
  ['Лиды',                  '32-leads.html'],
  ['— Контент —',           ''],
  ['Конструктор курса',     '01-course-builder.html'],
  ['Конструктор работы',    '13-work-builder.html'],
  ['Банк задач',            '14-task-bank.html'],
  ['Конструктор задачи',    '15-task-editor.html'],
  ['— Кабинет ученика —',   ''],
  ['Главная ученика',       '11-student-home.html'],
  ['Мои курсы',             '18-student-courses.html'],
  ['Календарь',             '16-student-calendar.html'],
  ['Результаты',            '17-student-results.html'],
  ['Лицевой счёт',          '19-account.html'],
  ['Плеер курса',           '02-player.html'],
  ['Экзамен',               '12-exam.html']
];

function navGo(v){ if(v) location.href = v; }

/* Переходы оформлены ссылками <a href>, чтобы работали привычные способы открыть
   в новой вкладке: средняя кнопка, Ctrl/Cmd+клик, контекстное меню.
   sameTab(event) возвращает true для обычного клика — тогда переход берёт на себя
   страница (без перезагрузки); при модификаторе возвращает false и адрес открывает браузер. */
function sameTab(ev){
  if(ev.metaKey || ev.ctrlKey || ev.shiftKey || ev.altKey || ev.button === 1) return false;
  ev.preventDefault();
  return true;
}

/* Шапка на части экранов перерисовывается скриптом, поэтому вставку повторяем
   при любых изменениях DOM: иначе селектор исчезает после первого же render(). */
function navMount(){
  var head = document.querySelector('.head') || document.querySelector('.phead') ||
             document.querySelector('.top') || document.querySelector('.demo-bar');
  if(!head || head.querySelector('.navpick')) return;
  var here = location.pathname.split('/').pop();
  var wrap = document.createElement('label');
  wrap.className = 'demo navpick';
  wrap.style.cssText = 'display:flex;align-items:center;gap:var(--sp-6);font-size:var(--fs-12);color:var(--gray6);flex:none';
  wrap.innerHTML = '<span>экран <i>(демо)</i></span>' +
    '<select onchange="navGo(this.value)" style="padding:var(--sp-4) var(--sp-8);font-size:var(--fs-12);max-width:200px">' +
    SCREENS.map(function(s){
      if(!s[1]) return '<option disabled>' + s[0] + '</option>';
      var on = s[1].split('#')[0] === here;
      return '<option value="' + s[1] + '"' + (on ? ' selected' : '') + '>' + s[0] + '</option>';
    }).join('') + '</select>';
  head.appendChild(wrap);
}
document.addEventListener('DOMContentLoaded', function(){
  navMount();
  new MutationObserver(navMount).observe(document.body, {childList:true, subtree:true});
});
