"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isMobileEnv() {
    return /(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent);
}
exports.isMobileEnv = isMobileEnv;
function debounce(handler, delay) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            handler(...args);
        }, delay);
    };
}
exports.debounce = debounce;
