"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
function createDraggableButton(className = '', innerHtml = '上报bug', clickEvent) {
    const btn = document.createElement('div');
    btn.innerHTML = innerHtml;
    btn.style.position = 'absolute';
    btn.style.top = '0';
    btn.style.left = '0';
    btn.style.cursor = 'pointer';
    btn.className = className;
    const is_in_mobile_env = utils_1.isMobileEnv();
    let is_active = false;
    let initial_x = 0;
    let initial_y = 0;
    let current_x = 0;
    let current_y = 0;
    let offset_x = 0;
    let offset_y = 0;
    let x_pos_start = 0;
    let x_pos_end = 0;
    let y_pos_start = 0;
    let y_pos_end = 0;
    const evt_start = is_in_mobile_env ? 'touchstart' : 'mousedown';
    const evt_move = is_in_mobile_env ? 'touchmove' : 'mousemove';
    const evt_end = is_in_mobile_env ? 'touchend' : 'mouseup';
    const debounceClickEvent = utils_1.debounce(clickEvent, 200);
    document.addEventListener(evt_start, dragStart);
    document.addEventListener(evt_move, dragging);
    document.addEventListener(evt_end, dragEnd);
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
    });
    return btn;
    function dragStart(e) {
        if (e.target !== btn) {
            return;
        }
        if (is_in_mobile_env) {
            x_pos_start = e.touches[0].clientX;
            y_pos_start = e.touches[0].clientY;
        }
        else {
            x_pos_start = e.clientX;
            y_pos_start = e.clientY;
        }
        initial_x = x_pos_start - offset_x;
        initial_y = y_pos_start - offset_y;
        is_active = true;
    }
    function dragging(e) {
        if (is_active) {
            e.preventDefault();
            if (is_in_mobile_env) {
                x_pos_end = e.touches[0].clientX;
                y_pos_end = e.touches[0].clientY;
            }
            else {
                x_pos_end = e.clientX;
                y_pos_end = e.clientY;
            }
            current_x = x_pos_end - initial_x;
            current_y = y_pos_end - initial_y;
            offset_x = current_x;
            offset_y = current_y;
            setTranslate(current_x, current_y, btn);
        }
    }
    function dragEnd(e) {
        // 如果偏移量小于10, 认为是用户进行了单击, 大于10, 认为进行了拖拽
        if (e.target === btn &&
            (!(current_x && current_y) || Math.pow(x_pos_end - x_pos_start, 2) + Math.pow(y_pos_end - y_pos_start, 2) < 50)) {
            debounceClickEvent();
        }
        initial_x = current_x;
        initial_y = current_y;
        is_active = false;
    }
    function setTranslate(x, y, element) {
        element.style.transform = `translate3d(${x}px,${y}px,0)`;
    }
}
exports.createDraggableButton = createDraggableButton;
