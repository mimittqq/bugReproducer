"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Recorder {
    constructor(max) {
        this.user_operations = [];
        this.max = max;
    }
    add(message) {
        this.user_operations.push(message);
        this.user_operations.splice(0, this.user_operations.length - this.max);
    }
    print() {
        let length = this.user_operations.length;
        let i = 0;
        while (i < length) {
            console.log(this.user_operations[i++]);
        }
    }
}
exports.Recorder = Recorder;
