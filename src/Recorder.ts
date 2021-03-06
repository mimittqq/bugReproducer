import { logFormat } from '../interfaces/recorder';

export class Recorder {
  user_operations:logFormat[] = [];
  private max:number;
  constructor(max:number) {
    this.max = max;
  }

  add(message:logFormat) {
    this.user_operations.push(message);
    this.user_operations.splice(0, this.user_operations.length - this.max);
  }

  print() {
    let length = this.user_operations.length;
    let i = 0
    while (i < length) {
      const { type, detail } = this.user_operations[i++];
      console.log(
        `%c${type}`,
        `color: #444;
         font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
         font-size: 14px;
         padding: 4px 0;
         line-height: 20px`,
      );
      console.log(`%c${detail}`,
        `background: rgb(255, 255, 219);
         padding: 1px 5px;
         border: 1px solid rgba(0, 0, 0, 0.1)`)
    }
  }
}