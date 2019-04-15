import { Recorder } from './Recorder';

export class XmlRecorder {
  private url:string;
  private method:string;
  private recorder:Recorder;
  constructor(url:string, method:string, recorder:Recorder) {
    this.url = url;
    this.method = method;
    this.recorder = recorder;
  }
  
  onSend(data?:Document | BodyInit | null) {
    const { url, method } = this;
    this.recorder.add(`发送请求, url:${url}, method:${method}, body:${data}`)
  }

  onAbort() {
    const { url, method } = this;
    this.recorder.add(`取消请求, url:${url}, method:${method}`);
  }

  onResponse(status:number, res_text:string) {
    const { url, method } = this;
    this.recorder.add(`${method} ${url} 得到响应, status:${status}, 响应体:${res_text}`);
  }
}