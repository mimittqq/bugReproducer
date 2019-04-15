export class Recorder {
  user_operations:string[] = [];
  private max:number;
  constructor(max:number) {
    this.max = max;
  }

  add(message:string) {
    this.user_operations.push(message);
    this.user_operations.splice(0, this.user_operations.length - this.max);
  }

  print() {
    let length = this.user_operations.length;
    let i = 0
    while (i < length) {
      console.log(this.user_operations[i++]);
    }
  }
}