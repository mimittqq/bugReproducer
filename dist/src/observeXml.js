"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function observeXml(hook) {
    const proto = XMLHttpRequest.prototype;
    const { open, send, abort } = proto;
    const { onOpen, onSend, onResponse, onAbort } = hook;
    function _open(method, url) {
        onOpen(method, url);
        this.addEventListener('readystatechange', () => {
            if (this.readyState === 4) {
                onResponse(this.status, this.response);
            }
        });
        return open.apply(this, arguments);
    }
    function _send(body) {
        onSend(body);
        return send.call(this, body);
    }
    function _abort() {
        onAbort();
        return abort.apply(this);
    }
    Object.assign(proto, {
        open: _open,
        abort: _abort,
        send: _send,
    });
}
exports.observeXml = observeXml;
