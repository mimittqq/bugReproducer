export type ReproduceType = 'request'|'click';

export interface BugReproducerOptions {
  // 记录最近操作条数, 默认20
  record_num?:number;
  // 需要监听的重现事件
  types?:ReproduceType[];
  // 回调
  callback?:(logs:string[]) => void;
  // 上报按钮classname
  className?:string;
  btn_text?:string;
}