import { recorder } from "./Recorder";

export function observeClickEvent() {
  document.addEventListener('click', (e) => {
    const { className, innerText, nodeName, id } = e.target as any;
    recorder.add(`发生点击事件, 节点类型:${nodeName.toLowerCase()}, 
      ${id ? `id:${id}` : ''}, ${className ? `class:${className}` : ''}, 
      内容:${innerText ? innerText.substring(0, 10) : ''}`)
  })
}