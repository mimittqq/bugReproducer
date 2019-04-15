import { observerXmlHook } from '../interfaces/observerXml';

export function observeXml(hook:observerXmlHook) {
  const proto = XMLHttpRequest.prototype;
  const { open, send, abort } = proto;
  const { onOpen, onSend, onResponse, onAbort } = hook;

  function _open(method:string, url:string) {
    onOpen(method, url);
    (this as XMLHttpRequest).addEventListener('readystatechange', () => {
      if (this.readyState === 4) {
        onResponse(this.status, this.response);
      }
    })
    return open.apply(this, <any>arguments);
  }

  function _send(body?:Document | BodyInit | null) {
    onSend(body);
    return send.call(this, body);
  }

  function _abort() {
    onAbort();
    return abort.apply(this);
  }

  Object.assign(
    proto,
    {
      open: _open,
      abort: _abort,
      send: _send,
    }
  );
}