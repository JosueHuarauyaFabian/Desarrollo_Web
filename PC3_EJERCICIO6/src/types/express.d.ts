import 'express';
import { JwtPayload } from 'jsonwebtoken';

declare global {
  namespace Express {
    export interface Request {
      user?: string | JwtPayload; // Asegúrate de ajustar el tipo
    }
  }
}
