"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const defaultOptions_1 = require("./defaultOptions");
const Recorder_1 = require("./Recorder");
const observeClickEvent_1 = require("./observeClickEvent");
const observeXml_1 = require("./observeXml");
const createDraggableButton_1 = require("./createDraggableButton");
const XmlRecorder_1 = require("./XmlRecorder");
function bugReproducer(options) {
    const opt = Object.assign({}, defaultOptions_1.default_options, options);
    const recorder = new Recorder_1.Recorder(opt.record_num);
    const { types, classname, btn_text, callback, btn_left, btn_top } = opt;
    let xml_recorder;
    if (types) {
        if (types.indexOf('click') !== -1) {
            observeClickEvent_1.observeClickEvent((className, innerText, nodeName, id) => {
                recorder.add({
                    type: 'Click event',
                    detail: `node_type:${nodeName.toLowerCase()}, ${id ? `id:${id}, ` : ''}${className ? `class:${className}, ` : ''}content:${innerText ? innerText.substring(0, 10) : ''}`
                });
            });
        }
        if (types.indexOf('request') !== -1) {
            observeXml_1.observeXml({
                onOpen: (method, url) => {
                    xml_recorder = new XmlRecorder_1.XmlRecorder(url, method, recorder);
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
    const btn = createDraggableButton_1.createDraggableButton(classname, btn_text, () => {
        recorder.print();
        if (callback) {
            callback(recorder.user_operations);
        }
    }, btn_top, btn_left);
    document.body.append(btn);
}
exports.bugReproducer = bugReproducer;
