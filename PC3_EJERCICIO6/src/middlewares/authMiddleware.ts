import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Extraer el token después de 'Bearer'

  if (!token) {
    return res.status(401).json({ message: 'Acceso no autorizado. Token faltante.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = decoded; // Opcional: agrega el usuario decodificado a la request
    next();
  } catch (err) {
    res.status(403).json({ message: 'Token inválido.' });
  }
};
