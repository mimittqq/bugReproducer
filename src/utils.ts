export function isMobileEnv() : boolean {
  return /(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent);
}

export function debounce(handler:Function, delay:number) {
  let timer:number;
  return (...args:any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      handler(...args)
    }, delay);
  }
}