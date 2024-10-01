import CustomTimer from './custom-timer';

let requestQueue: number[] = [];
let activeRequests = 0;
const maxActiveRequests = 5;
const customTimer = new CustomTimer();

// Procesar solicitud usando promesas
function processRequestWithPromise(requestId: number): Promise<void> {
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

// Gestionar la cola de solicitudes con promesas
function handleRequestsWithPromises(): void {
    if (requestQueue.length > 0 && activeRequests < maxActiveRequests) {
        const requestId = requestQueue.shift();
        if (requestId !== undefined) {
            activeRequests++;

            processRequestWithPromise(requestId)
                .then(() => {
                    activeRequests--;
                    handleRequestsWithPromises();  // Procesar la siguiente solicitud
                })
                .catch(() => {
                    activeRequests--;
                    handleRequestsWithPromises();  // Procesar la siguiente solicitud incluso si falla
                });
        }
    }
}

// Simular la llegada de solicitudes cada 2 segundos
let requestId = 1;
const requestArrivalTimer = new CustomTimer();

requestArrivalTimer.setTimer(function newRequest() {
    console.log(`Nueva solicitud recibida: ${requestId}`);
    requestQueue.push(requestId++);
    
    handleRequestsWithPromises();
    
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