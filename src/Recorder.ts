export class Recorder {
  private user_operations:string[] = [];
  private max:number;
  constructor(max:number) {
    this.max = max;
  }
  add(message:string) {
    this.user_operations.push(message);
    this.user_operations.splice(0, this.user_operations.length - this.max);
  }
}

export const recorder = new Recorder(30);