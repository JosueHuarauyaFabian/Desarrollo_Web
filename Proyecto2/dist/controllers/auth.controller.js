"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwtSecret = "your_jwt_secret"; // Usar la propia clave secreta para JWT
const login = (req, res) => {
    const { username, password } = req.body;
    // Validación simple para el login
    if (username === "admin" && password === "password") {
        const token = jsonwebtoken_1.default.sign({ username }, jwtSecret, { expiresIn: "1h" });
        res.status(200).json({ token });
    }
    else {
        res.status(401).json({ error: "Credenciales incorrectas" });
    }
};
exports.login = login;
