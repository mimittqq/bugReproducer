export function isMobileEnv() : boolean {
  return /(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent);
}