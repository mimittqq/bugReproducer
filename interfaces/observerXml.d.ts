export interface observerXmlHook {
  onOpen:(method:string, url:string) => void;
  onSend:(body?:Document | BodyInit | null) => void;
  onAbort:() => void;
  onResponse:(status:number, res_text:string) => void;
}