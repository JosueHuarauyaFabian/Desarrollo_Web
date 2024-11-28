// src/middlewares/logMiddleware.ts

import { Request, Response, NextFunction } from 'express';
import pool from '../utils/database';

export const logActivity = (accion: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const id_usuario = req.user?.id_usuario || null;
    const ip_origen = req.ip;

    try {
      await pool.query(
        'INSERT INTO logs_actividad (id_usuario, accion, ip_origen) VALUES ($1, $2, $3)',
        [id_usuario, accion, ip_origen]
      );
    } catch (err) {
      console.error('Error al registrar el log:', err);
    }

    next();
  };
};
