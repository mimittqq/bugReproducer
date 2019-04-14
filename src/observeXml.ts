import { RecordXmlFormat } from "../interfaces/Recorder";
import { XmlRecorder } from "./XmlRecorder";

export function observeXml() {
  const proto = XMLHttpRequest.prototype;
  const { open, send, onreadystatechange, abort, setRequestHeader } = proto;
  let xml_recorder:XmlRecorder | undefined;
  let url = '';
  let method = '';

  function _open(method:string, url:string) {
    xml_recorder = new XmlRecorder(url, method);
    return open.apply(this, <any>arguments);
  }

  function _send(body?:Document | BodyInit | null) {
    if (xml_recorder) {
      xml_recorder.onSend(body);
    }
    return send.call(this, body);
  }

  function _abort() {
    if (xml_recorder) {
      xml_recorder.onAbort();
    }
    xml_recorder = undefined;
    url = '';
    method = '';
    return abort.apply(this);
  }

  function _onreadystatechange() {
    if (this.readyState === 4) {
      if (xml_recorder) {
        xml_recorder.onResponse(this.status, this.response)
      }
    }

  }

  Object.assign(
    proto,
    {
      open: _open,
      abort: _abort,
      send: _send,
      onreadystatechange: _onreadystatechange,
    }
  );
}