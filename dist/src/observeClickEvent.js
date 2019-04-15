"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function observeClickEvent(callback) {
    document.addEventListener('click', (e) => {
        const { className, innerText, nodeName, id } = e.target;
        callback(className, innerText, nodeName, id);
    });
}
exports.observeClickEvent = observeClickEvent;
