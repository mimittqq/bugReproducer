import { recorder } from "./Recorder";

export class XmlRecorder {
  private url:string;
  private method:string;
  constructor(url:string, method:string) {
    this.url = url;
    this.method = method;
  }
  
  onSend(data?:Document | BodyInit | null) {
    const { url, method } = this;
    recorder.add(`发送请求, url:${url}, method:${method}, body:${data}`)
  }

  onAbort() {
    const { url, method } = this;
    recorder.add(`取消请求, url:${url}, method:${method}`);
  }

  onResponse(status:number, res_text:string) {
    const { url, method } = this;
    recorder.add(`${method} ${url}得到响应, status:${status}, 响应体:${res_text}`);
  }
}