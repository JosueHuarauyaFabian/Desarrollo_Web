import CustomTimer from './simula-tiempo';

let requestQueue: number[] = [];
let activeRequests = 0;
const maxActiveRequests = 5;
const customTimer = new CustomTimer();

// Procesar solicitud usando async/await
async function processRequestAsync(requestId: number): Promise<void> {
    const processingTime = Math.floor(Math.random() * 5000) + 1000;  // Entre 1 y 5 segundos
    console.log(`Solicitud ${requestId} en proceso. Tardará ${processingTime / 1000} segundos.`);

    return new Promise((resolve, reject) => {
        customTimer.setTimer(() => {
            const success = Math.random() > 0.2;  // 80% éxito
            if (success) {
                console.log(`Solicitud ${requestId} procesada correctamente.`);
                resolve();
            } else {
                console.log(`Solicitud ${requestId} falló.`);
                reject();
            }
        }, processingTime);
    });
}

// Gestionar la cola de solicitudes con async/await
async function handleRequestsAsync(): Promise<void> {
    while (requestQueue.length > 0 && activeRequests < maxActiveRequests) {
        const requestId = requestQueue.shift();
        if (requestId !== undefined) {
            activeRequests++;

            try {
                await processRequestAsync(requestId);
            } catch (error) {
                console.log(`Error procesando la solicitud ${requestId}`);
            }

            activeRequests--;
            handleRequestsAsync();  // Procesar la siguiente solicitud
        }
    }
}

// Simular la llegada de solicitudes cada 2 segundos
let requestId = 1;
const requestArrivalTimer = new CustomTimer();

requestArrivalTimer.setTimer(function newRequest() {
    console.log(`Nueva solicitud recibida: ${requestId}`);
    requestQueue.push(requestId++);
    
    handleRequestsAsync();
    
    if (requestId <= 10) {
        requestArrivalTimer.setTimer(newRequest, 2000);  // Simular solicitudes cada 2 segundos
    }
}, 2000);

// Detención automática por inactividad
const inactivityTimer = new CustomTimer();

function checkInactivity(): void {
    if (requestQueue.length === 0 && activeRequests === 0) {
        console.log("El servidor se ha detenido por inactividad.");
    } else {
        inactivityTimer.setTimer(checkInactivity, 10000);  // Revisar cada 10 segundos
    }
}

inactivityTimer.setTimer(checkInactivity, 10000);