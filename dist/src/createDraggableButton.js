"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
function createDraggableButton(className = '', innerHtml = '上报bug', clickEvent, default_top, default_left) {
    const btn = document.createElement('div');
    btn.innerHTML = innerHtml;
    btn.style.position = 'absolute';
    btn.style.top = default_top ? `${default_top}px` : '0';
    btn.style.left = default_left ? `${default_left}px` : '0';
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
    let btn_width;
    let btn_height;
    const evt_start = is_in_mobile_env ? 'touchstart' : 'mousedown';
    const evt_move = is_in_mobile_env ? 'touchmove' : 'mousemove';
    const evt_end = is_in_mobile_env ? 'touchend' : 'mouseup';
    const debounceClickEvent = utils_1.debounce(clickEvent, 200);
    document.addEventListener(evt_start, dragStart);
    document.addEventListener(evt_move, dragging);
    document.addEventListener(evt_end, dragEnd);
    // 窗口宽高变化的时候要检查按钮当前位置是不是处于可视区域, 不是的话需要调整
    window.addEventListener('resize', () => {
        // 因为 resize 过程中可能出现滚动条 所以 maxx 跟 maxy 都需要内缩一点点
        let result_x = getRageValue(offset_x, getBtnMaxX() - 5, getBtnMinX());
        let result_y = getRageValue(offset_y, getBtnMaxY() - 5, getBtnMinY());
        if (result_x !== current_x) {
            setTranslate(result_x, result_y, btn);
        }
    });
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
        btn_height = btn.clientHeight;
        btn_width = btn.clientWidth;
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
            current_x = getRageValue(x_pos_end - initial_x, getBtnMaxX(), getBtnMinX());
            current_y = getRageValue(y_pos_end - initial_y, getBtnMaxY(), getBtnMinY());
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
    function getRageValue(value, max, min) {
        if (value > max) {
            return max;
        }
        if (value < min) {
            return min;
        }
        return value;
    }
    function getBtnMaxX() {
        return window.innerWidth - btn_width - (default_left || 0);
    }
    function getBtnMaxY() {
        return window.innerHeight - btn_height - (default_top || 0);
    }
    function getBtnMinX() {
        return default_left ? -default_left : 0;
    }
    function getBtnMinY() {
        return default_top ? -default_top : 0;
    }
}
exports.createDraggableButton = createDraggableButton;
