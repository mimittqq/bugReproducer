export interface logFormat {
  type:'Send request'|'Get response'|'Cancel request'|'Click event',
  detail?:string;
}