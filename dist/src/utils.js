"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isMobileEnv() {
    return /(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent);
}
exports.isMobileEnv = isMobileEnv;
