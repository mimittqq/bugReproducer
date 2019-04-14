export type ReproduceType = 'request'|'click'|'postMessage';

export interface BugReproducerOptions {
  // 记录最近操作条数, 默认20
  record_num?:number;
  // 需要监听的重现事件
  type?:ReproduceType[];
  // 回调
  callback?:(reproduce_type:ReproduceType) => void;
}