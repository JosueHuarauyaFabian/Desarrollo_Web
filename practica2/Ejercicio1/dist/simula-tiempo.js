"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CustomTimer {
    constructor() {
        this.callbacks = [];
    }
    // Agregar un temporizador con retraso
    setTimer(callback, delay) {
        const start = Date.now();
        const checkTime = () => {
            const elapsed = Date.now() - start;
            if (elapsed >= delay) {
                callback();
            }
            else {
                this.callbacks.push(setImmediate(checkTime)); // Utilizamos setImmediate en lugar de setTimeout
            }
        };
        this.callbacks.push(setImmediate(checkTime));
    }
}
exports.default = CustomTimer;
