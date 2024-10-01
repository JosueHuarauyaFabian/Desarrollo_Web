class CustomTimer {
    private callbacks: NodeJS.Immediate[] = [];
    
    // Agregar un temporizador con retraso
    setTimer(callback: () => void, delay: number): void {
        const start = Date.now();
        const checkTime = () => {
            const elapsed = Date.now() - start;
            if (elapsed >= delay) {
                callback();
            } else {
                this.callbacks.push(setImmediate(checkTime));  // Utilizamos setImmediate en lugar de setTimeout
            }
        };
        this.callbacks.push(setImmediate(checkTime));
    }
}

export default CustomTimer;