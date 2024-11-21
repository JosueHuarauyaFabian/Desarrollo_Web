import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { LoginRequestBody } from '../../src/types/LoginRequestBody';

const router = Router();

// Endpoint para login
router.post('/login', (req: Request<{}, {}, LoginRequestBody>, res: Response) => {
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ message: 'El nombre de usuario es obligatorio' });
  }

  try {
    const token = jwt.sign({ username }, process.env.JWT_SECRET || 'default_secret', { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Error al generar el token', error });
  }
});

export default router;
