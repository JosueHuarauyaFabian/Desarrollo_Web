// src/routes/authRoutes.ts

import { Router } from 'express';
import { register, login, googleAuth, googleCallback } from '../controllers/authController';
import passport from 'passport';

const router = Router();

// Registro e inicio de sesión
router.post('/register', register);
router.post('/login', login);

// Autenticación con Google
router.get('/google', googleAuth);
router.get('/google/callback', passport.authenticate('google', { session: false }), googleCallback);

export default router;
