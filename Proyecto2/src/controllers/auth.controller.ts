import { Request, Response } from "express";
import jwt from "jsonwebtoken";

const jwtSecret = "your_jwt_secret"; // Usar la propia clave secreta para JWT

export const login = (req: Request, res: Response): void => {
  const { username, password } = req.body;

  // Validación simple para el login
  if (username === "admin" && password === "password") {
    const token = jwt.sign({ username }, jwtSecret, { expiresIn: "1h" });
    res.status(200).json({ token });
  } else {
    res.status(401).json({ error: "Credenciales incorrectas" });
  }
};
