import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface CustomRequest extends Request {
  user?: any;
}

/**
 * Middleware para verificar y validar el token JWT.
 */
export const authMiddleware = async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    res.status(401).json({ error: "Access denied, no token provided." });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "your_jwt_secret"); // Usa la clave secreta desde el entorno
    req.user = decoded; // Asigna el usuario decodificado al objeto de la solicitud
    next(); // Continúa con el siguiente middleware o controlador
  } catch (error) {
    res.status(400).json({ error: "Invalid token." });
  }
};
