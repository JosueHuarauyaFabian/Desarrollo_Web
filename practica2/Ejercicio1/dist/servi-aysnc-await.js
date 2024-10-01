"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const simula_tiempo_1 = __importDefault(require("./simula-tiempo"));
let requestQueue = [];
let activeRequests = 0;
const maxActiveRequests = 5;
const customTimer = new simula_tiempo_1.default();
// Procesar solicitud usando async/await
function processRequestAsync(requestId) {
    return __awaiter(this, void 0, void 0, function* () {
        const processingTime = Math.floor(Math.random() * 5000) + 1000; // Entre 1 y 5 segundos
        console.log(`Solicitud ${requestId} en proceso. Tardará ${processingTime / 1000} segundos.`);
        return new Promise((resolve, reject) => {
            customTimer.setTimer(() => {
                const success = Math.random() > 0.2; // 80% éxito
                if (success) {
                    console.log(`Solicitud ${requestId} procesada correctamente.`);
                    resolve();
                }
                else {
                    console.log(`Solicitud ${requestId} falló.`);
                    reject();
                }
            }, processingTime);
        });
    });
}
// Gestionar la cola de solicitudes con async/await
function handleRequestsAsync() {
    return __awaiter(this, void 0, void 0, function* () {
        while (requestQueue.length > 0 && activeRequests < maxActiveRequests) {
            const requestId = requestQueue.shift();
            if (requestId !== undefined) {
                activeRequests++;
                try {
                    yield processRequestAsync(requestId);
                }
                catch (error) {
                    console.log(`Error procesando la solicitud ${requestId}`);
                }
                activeRequests--;
                handleRequestsAsync(); // Procesar la siguiente solicitud
            }
        }
    });
}
// Simular la llegada de solicitudes cada 2 segundos
let requestId = 1;
const requestArrivalTimer = new simula_tiempo_1.default();
requestArrivalTimer.setTimer(function newRequest() {
    console.log(`Nueva solicitud recibida: ${requestId}`);
    requestQueue.push(requestId++);
    handleRequestsAsync();
    if (requestId <= 10) {
        requestArrivalTimer.setTimer(newRequest, 2000); // Simular solicitudes cada 2 segundos
    }
}, 2000);
// Detención automática por inactividad
const inactivityTimer = new simula_tiempo_1.default();
function checkInactivity() {
    if (requestQueue.length === 0 && activeRequests === 0) {
        console.log("El servidor se ha detenido por inactividad.");
    }
    else {
        inactivityTimer.setTimer(checkInactivity, 10000); // Revisar cada 10 segundos
    }
}
inactivityTimer.setTimer(checkInactivity, 10000);
