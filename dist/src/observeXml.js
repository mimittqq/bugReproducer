"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function observeXml(hook) {
    const proto = XMLHttpRequest.prototype;
    const { open, send, onreadystatechange, abort } = proto;
    const { onOpen, onSend, onResponse, onAbort } = hook;
    function _open(method, url) {
        onOpen(method, url);
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
    function _onreadystatechange() {
        if (this.readyState === 4) {
            onResponse(this.status, this.response);
        }
        if (onreadystatechange) {
            return onreadystatechange.apply(this, arguments);
        }
    }
    Object.assign(proto, {
        open: _open,
        abort: _abort,
        send: _send,
        onreadystatechange: onreadystatechange ? _onreadystatechange : onreadystatechange,
    });
}
exports.observeXml = observeXml;
