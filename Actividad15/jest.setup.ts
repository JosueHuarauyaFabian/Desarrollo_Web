// jest.setup.ts

// Importa TextEncoder y TextDecoder desde "util" y define globalmente solo si no existen
import { TextEncoder, TextDecoder } from "util";

if (typeof global.TextEncoder === "undefined") {
    global.TextEncoder = TextEncoder;
}

if (typeof global.TextDecoder === "undefined") {
    global.TextDecoder = TextDecoder as typeof global.TextDecoder;
}

process.env.SUPPRESS_JEST_WARNINGS = "true";

// Configuración adicional para pruebas DOM con Testing Library
import "@testing-library/jest-dom";
