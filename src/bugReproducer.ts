import { BugReproducerOptions } from "../interfaces/bugReproducer";
import { default_options } from './defaultOptions';
import { Recorder } from './Recorder';
import { observeClickEvent } from './observeClickEvent';
import { observeXml } from './observeXml';
import { createDraggableButton } from './createDraggableButton';
import { XmlRecorder } from './XmlRecorder';

export function bugReproducer(options:BugReproducerOptions) {
  const opt = Object.assign(
    {},
    default_options,
    options,
  );
  const recorder = new Recorder(opt.record_num as number);
  const { types, className, btn_text, callback } = opt;
  let xml_recorder:XmlRecorder|undefined;

  if (types) {
    if (types.indexOf('click') !== -1) {
      observeClickEvent(
        (className, innerText, nodeName, id) => {
          recorder.add(`发生点击事件, 节点类型:${nodeName.toLowerCase()}, 
            ${id ? `id:${id}` : ''}, ${className ? `class:${className}` : ''}, 
            内容:${innerText ? innerText.substring(0, 10) : ''}`);
        }
      );
    }
    if (types.indexOf('request') !== -1) {
      observeXml({
        onOpen: (method, url) => {
          xml_recorder = new XmlRecorder(url, method, recorder);
        },
        onSend: (body) => {
          if (xml_recorder) {
            xml_recorder.onSend(body);
          }
        },
        onAbort: () => {
          xml_recorder = undefined;
        },
        onResponse: (status, text) => {
          if (xml_recorder) {
            xml_recorder.onResponse(status, text);
          }
        }
      });
    }
  }
  const btn = createDraggableButton(className, btn_text);
  btn.addEventListener('click', () => {
    recorder.print();
    if (callback) {
      callback(recorder.user_operations);
    }
  });
  document.body.append(btn);
}
