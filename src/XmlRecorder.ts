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

  onResponse(status:number, res_text:string) {
    const { url, method } = this;
    this.recorder.add({
      type: 'Get response',
      detail: `from ${method} ${url}, status:${status}, body:${res_text}`
    });
  }
}