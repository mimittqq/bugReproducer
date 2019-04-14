import { ReproduceType, BugReproducerOptions } from "../interfaces/bugReproducer";

const default_opt:BugReproducerOptions = {
  record_num: 10,
  type: ['request', 'click', 'postMessage']
}

export class BugReproducer {
  private opt:BugReproducerOptions;
  constructor(options:BugReproducerOptions) {
    this.opt = Object.assign(
      {},
      default_opt,
      options
    );
  }
  init() {
    
  }
}