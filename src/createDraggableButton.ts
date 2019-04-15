import { isMobileEnv } from './utils';
export function createDraggableButton(
  className:string = '',
  innerHtml:string = '上报bug',
) {
  const btn = document.createElement('div');
  btn.innerHTML = innerHtml;
  btn.style.position = 'absolute';
  btn.style.top = '0';
  btn.style.left = '0';
  btn.style.cursor = 'pointer';
  btn.className = className;
  
  const is_in_mobile_env = isMobileEnv();
  let is_active = false;
  let initial_x:number;
  let initial_y:number;
  let current_x:number;
  let current_y:number;
  let offset_x = 0;
  let offset_y = 0;

  const evt_start = is_in_mobile_env ? 'touchstart' : 'mousedown';
  const evt_move = is_in_mobile_env ? 'touchmove' : 'mousemove';
  const evt_end = is_in_mobile_env ? 'touchend' : 'mouseup';

  document.addEventListener(evt_start, dragStart);
  document.addEventListener(evt_move, dragging);
  document.addEventListener(evt_end, dragEnd);
  return btn;

  function dragStart(e:TouchEvent|MouseEvent) {
    if (e.target !== btn) {
      return;
    }
    if (is_in_mobile_env) {
      initial_x = (e as TouchEvent).touches[0].clientX - offset_x;
      initial_y = (e as TouchEvent).touches[0].clientY - offset_y;
    } else {
      initial_x = (e as MouseEvent).clientX - offset_x;
      initial_y = (e as MouseEvent).clientY - offset_y;
    }
    is_active = true;
  }

  function dragging(e:TouchEvent|MouseEvent) {
    if (is_active) {
      e.preventDefault();
      if (is_in_mobile_env) {
        current_x = (e as TouchEvent).touches[0].clientX - initial_x;
        current_y = (e as TouchEvent).touches[0].clientY - initial_y;
      } else {
        current_x = (e as MouseEvent).clientX;
        current_y = (e as MouseEvent).clientY;
      }
      offset_x = current_x;
      offset_y = current_y;

      setTranslate(current_x, current_y, btn);
    }
  }

  function dragEnd(e:TouchEvent|MouseEvent) {
    initial_x = current_x;
    initial_y = current_y;
    is_active = false;
  }

  function setTranslate(x:number, y:number, element:HTMLDivElement) {
    element.style.transform = `translate3d(${x}px,${y}px,0)`;
  }
}