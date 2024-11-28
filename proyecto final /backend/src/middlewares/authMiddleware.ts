// src/middlewares/authMiddleware.ts

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers['auth-token'] as string;
  if (!token) {
    return res
      .status(401)
      .json({ error: 'Acceso denegado: No se proporcionó un token' });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as Express.User;
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).json({ error: 'Token inválido' });
  }
};

export const verifyAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // TypeScript now recognizes req.user.rol
  if (req.user?.rol !== 'Administrador') {
    return res.status(403).json({
      error: 'Acceso denegado: Se requiere rol de Administrador',
    });
  }
  next();
};
