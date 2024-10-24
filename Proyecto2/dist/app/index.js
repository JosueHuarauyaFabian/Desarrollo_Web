"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app")); // Importamos la instancia de la aplicación desde app.ts
// Configuración del puerto en el que el servidor escuchará, si no se define un valor en el entorno, se usa el puerto 3000
const PORT = process.env.PORT || 3000;
// Iniciamos el servidor en el puerto configurado
app_1.default.listen(PORT, () => {
    // Imprimimos en consola la URL base del servidor y la URL de la documentación de la API
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Swagger API Docs available at http://localhost:${PORT}/api-docs/#/`);
});
