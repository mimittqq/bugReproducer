export function observeClickEvent(callback:(
  className:string,
  innerText:string,
  nodeName:string,
  id:string,
) => void) {
  document.addEventListener('click', (e) => {
    const { className, innerText, nodeName, id } = e.target as any;
    callback(className, innerText, nodeName, id);
  })
}