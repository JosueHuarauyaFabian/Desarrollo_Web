"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
/**
 * Middleware para verificar y validar el token JWT.
 */
const authMiddleware = async (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
        res.status(401).json({ error: "Access denied, no token provided." });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || "your_jwt_secret"); // Usa la clave secreta desde el entorno
        req.user = decoded; // Asigna el usuario decodificado al objeto de la solicitud
        next(); // Continúa con el siguiente middleware o controlador
    }
    catch (error) {
        res.status(400).json({ error: "Invalid token." });
    }
};
exports.authMiddleware = authMiddleware;
