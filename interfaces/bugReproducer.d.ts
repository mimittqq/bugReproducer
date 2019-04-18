import { logFormat } from './recorder';
export type ReproduceType = 'request'|'click';

export interface BugReproducerOptions {
  // 记录最近操作条数, 默认20
  record_num?:number;
  // 需要监听的重现事件
  types?:ReproduceType[];
  // 回调
  callback?:(logs:logFormat[]) => void;
  // 上报按钮classname
  classname?:string;
  btn_text?:string;
  btn_top?:number;
  btn_left?:number;
}