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
        this.recorder.add(`发送请求, url:${url}, method:${method}, body:${data}`);
    }
    onAbort() {
        const { url, method } = this;
        this.recorder.add(`取消请求, url:${url}, method:${method}`);
    }
    onResponse(status, res_text) {
        const { url, method } = this;
        this.recorder.add(`${method} ${url} 得到响应, status:${status}, 响应体:${res_text}`);
    }
}
exports.XmlRecorder = XmlRecorder;
