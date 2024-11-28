// src/controllers/authController.ts

import passport from 'passport';
import { Request, Response, NextFunction, RequestHandler } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../utils/database';
import Joi from 'joi';
import { User } from '../models/User';

// Esquema de validación para el registro
const registerSchema = Joi.object({
  nombre: Joi.string().required(),
  email: Joi.string().email().required(),
  contraseña: Joi.string()
    .min(8)
    .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*]).+$'))
    .required()
    .messages({
      'string.pattern.base':
        'La contraseña debe contener al menos una letra mayúscula, una minúscula, un número y un carácter especial.',
    }),
  rol: Joi.string().valid('Administrador', 'Operador').required(),
});

// Controlador para el registro de usuarios
export const register: RequestHandler = async (req, res, next) => {
  const { error } = registerSchema.validate(req.body);
  if (error)
    return res.status(400).json({ error: error.details[0].message });

  const { nombre, email, contraseña, rol } = req.body;

  try {
    // Verificar si el email ya existe
    const existingUserResult = await pool.query(
      'SELECT * FROM usuarios WHERE email = $1',
      [email]
    );
    if (existingUserResult.rows.length > 0) {
      return res
        .status(400)
        .json({ error: 'El correo electrónico ya está registrado' });
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(contraseña, 10);

    // Insertar el nuevo usuario en la base de datos
    const result = await pool.query(
      'INSERT INTO usuarios (nombre, email, contraseña, rol) VALUES ($1, $2, $3, $4) RETURNING *',
      [nombre, email, hashedPassword, rol]
    );
    const usuario: User = result.rows[0];

    // No enviar la contraseña en la respuesta
    delete usuario.contraseña;

    return res.status(201).json({ usuario });
  } catch (err: any) {
    if (err.code === '23505') {
      // Código de error para 'unique_violation' en PostgreSQL
      return res
        .status(400)
        .json({ error: 'El correo electrónico ya está registrado' });
    } else {
      return res.status(500).json({ error: 'Error en el servidor' });
    }
  }
};

// Esquema de validación para el inicio de sesión
const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  contraseña: Joi.string().required(),
});

// Controlador para el inicio de sesión
export const login: RequestHandler = async (req, res, next) => {
  const { error } = loginSchema.validate(req.body);
  if (error)
    return res.status(400).json({ error: error.details[0].message });

  const { email, contraseña } = req.body;

  try {
    const result = await pool.query(
      'SELECT * FROM usuarios WHERE email = $1',
      [email]
    );
    const usuario: User = result.rows[0];
    if (!usuario)
      return res.status(400).json({ error: 'Credenciales inválidas' });

    const validPassword = await bcrypt.compare(
      contraseña,
      usuario.contraseña as string
    );
    if (!validPassword)
      return res.status(400).json({ error: 'Credenciales inválidas' });

    // Generar el token JWT
    const token = jwt.sign(
      { id_usuario: usuario.id_usuario, rol: usuario.rol },
      process.env.JWT_SECRET as string,
      { expiresIn: '1h' }
    );

    // Enviar el token en la respuesta
    return res.header('auth-token', token).json({ token });
  } catch (err) {
    return res.status(500).json({ error: 'Error en el servidor' });
  }
};

// Controlador para iniciar la autenticación con Google
export const googleAuth = passport.authenticate('google', {
  scope: ['profile', 'email'],
});

// Controlador para el callback de Google OAuth
export const googleCallback: RequestHandler = (req, res, next) => {
  // 'req.user' es proporcionado por Passport después de la autenticación exitosa
  const usuario = req.user as User;

  // Generar el token JWT
  const token = jwt.sign(
    { id_usuario: usuario.id_usuario, rol: usuario.rol },
    process.env.JWT_SECRET as string,
    { expiresIn: '1h' }
  );

  // Redirigir al frontend pasando el token en una cookie segura
  return res
    .cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // true en producción
      sameSite: 'lax',
    })
    .redirect('http://localhost:3000/dashboard');
};
