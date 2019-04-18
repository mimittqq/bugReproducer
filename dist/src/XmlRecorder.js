"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class XmlRecorder {
    constructor(url, method, recorder) {
        this.url = url;
        this.method = method;
        this.recorder = recorder;
    }
    onSend(data) {
        const { url, method } = this;
        this.recorder.add({
            type: 'Send request',
            detail: `url:${url}, method:${method}, body:${data}`,
        });
    }
    onAbort() {
        const { url, method } = this;
        this.recorder.add({
            type: 'Cancel request',
            detail: `url:${url}, method:${method}`,
        });
    }
    onResponse(status, res_text) {
        const { url, method } = this;
        this.recorder.add({
            type: 'Get response',
            detail: `from ${method} ${url}, status:${status}, body:${res_text}`
        });
    }
}
exports.XmlRecorder = XmlRecorder;
