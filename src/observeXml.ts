import { observerXmlHook } from '../interfaces/observerXml';

export function observeXml(hook:observerXmlHook) {
  const proto = XMLHttpRequest.prototype;
  const { open, send, onreadystatechange, abort } = proto;
  const { onOpen, onSend, onResponse, onAbort } = hook;

  function _open(method:string, url:string) {
    onOpen(method, url);
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

  function _onreadystatechange() {
    if (this.readyState === 4) {
      onResponse(this.status, this.response);
    }
    if (onreadystatechange) {
      return onreadystatechange.apply(this, <any>arguments);
    }
  }

  Object.assign(
    proto,
    {
      open: _open,
      abort: _abort,
      send: _send,
      onreadystatechange: onreadystatechange ? _onreadystatechange : onreadystatechange,
    }
  );
}