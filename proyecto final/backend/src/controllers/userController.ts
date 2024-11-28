// src/controllers/userController.ts

import { Request, Response } from 'express';
import pool from '../utils/database';
import { User } from '../models/User';
import Joi from 'joi';

// Esquema de validación para actualizar usuario
const updateUserSchema = Joi.object({
  nombre: Joi.string().optional(),
  email: Joi.string().email().optional(),
  rol: Joi.string().valid('Administrador', 'Operador').optional(),
});

// Obtener información de un usuario
export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await pool.query('SELECT id_usuario, nombre, email, rol FROM usuarios WHERE id_usuario = $1', [id]);
    if (result.rows.length === 0)
      return res.status(404).json({ error: 'Usuario no encontrado' });

    const usuario: User = result.rows[0];
    res.json({ usuario });
  } catch (err) {
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

// Actualizar información de un usuario
export const updateUser = async (req: Request, res: Response) => {
  const { error } = updateUserSchema.validate(req.body);
  if (error)
    return res.status(400).json({ error: error.details[0].message });

  const { id } = req.params;
  const { nombre, email, rol } = req.body;

  try {
    const result = await pool.query(
      'UPDATE usuarios SET nombre = $1, email = $2, rol = $3 WHERE id_usuario = $4 RETURNING *',
      [nombre, email, rol, id]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ error: 'Usuario no encontrado' });

    const usuario: User = result.rows[0];
    delete usuario.contraseña;

    res.json({ usuario });
  } catch (err) {
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

// Eliminar un usuario
export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM usuarios WHERE id_usuario = $1 RETURNING *', [id]);
    if (result.rows.length === 0)
      return res.status(404).json({ error: 'Usuario no encontrado' });

    res.json({ mensaje: 'Usuario eliminado' });
  } catch (err) {
    res.status(500).json({ error: 'Error en el servidor' });
  }
};
