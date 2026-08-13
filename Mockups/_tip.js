/* FS-LMS 2.0 — всплывающая подсказка. Один компонент на все мокапы.
   tipShow(event, html) показывает плашку у элемента, tipHide() убирает.
   Разметка содержимого: .h — заголовок, .q — пояснение, .a — строка «поле: значение»
   (.a.good / .a.bad — зелёное и красное значение), .note — примечание внизу. */
function tipEl(){
  var el = document.getElementById('tipbox');
  if(!el){
    el = document.createElement('div');
    el.id = 'tipbox'; el.className = 'tipbox';
    document.body.appendChild(el);
  }
  return el;
}
function tipShow(ev, html){
  var el = tipEl();
  el.innerHTML = html;
  el.classList.add('on');
  var r = ev.currentTarget.getBoundingClientRect(), w = el.offsetWidth, h = el.offsetHeight;
  el.style.left = Math.min(Math.max(8, r.left + r.width/2 - w/2), innerWidth - w - 8) + 'px';
  el.style.top  = (r.top - h - 9 < 8 ? r.bottom + 9 : r.top - h - 9) + 'px';
}
function tipHide(){ var el = document.getElementById('tipbox'); if(el) el.classList.remove('on'); }
