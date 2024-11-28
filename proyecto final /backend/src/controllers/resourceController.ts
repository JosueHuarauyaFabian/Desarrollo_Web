// src/controllers/resourceController.ts

import { Request, Response } from 'express';
import pool from '../utils/database';
import { Resource } from '../models/Resource';
import Joi from 'joi';

// Esquema de validación para los recursos
const resourceSchema = Joi.object({
  tipo_recurso: Joi.string().valid('Servidor', 'Base de Datos').required(),
  configuracion: Joi.string().required(),
  estado: Joi.string().valid('Activo', 'Inactivo').required(),
});

// Crear un nuevo recurso
export const createResource = async (req: Request, res: Response) => {
  const { error } = resourceSchema.validate(req.body);
  if (error)
    return res.status(400).json({ error: error.details[0].message });

  const { tipo_recurso, configuracion, estado } = req.body;
  const id_usuario = req.user?.id_usuario;

  try {
    const result = await pool.query(
      'INSERT INTO recursos (tipo_recurso, configuracion, estado, id_usuario) VALUES ($1, $2, $3, $4) RETURNING *',
      [tipo_recurso, configuracion, estado, id_usuario]
    );
    const recurso: Resource = result.rows[0];
    res.status(201).json({ recurso });
  } catch (err) {
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

// Obtener todos los recursos
export const getResources = async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM recursos');
    const recursos: Resource[] = result.rows;
    res.json({ recursos });
  } catch (err) {
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

// Actualizar un recurso existente
export const updateResource = async (req: Request, res: Response) => {
  const { error } = resourceSchema.validate(req.body);
  if (error)
    return res.status(400).json({ error: error.details[0].message });

  const { id } = req.params;
  const { tipo_recurso, configuracion, estado } = req.body;

  try {
    const result = await pool.query(
      'UPDATE recursos SET tipo_recurso = $1, configuracion = $2, estado = $3 WHERE id_recurso = $4 RETURNING *',
      [tipo_recurso, configuracion, estado, id]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ error: 'Recurso no encontrado' });

    const recurso: Resource = result.rows[0];
    res.json({ recurso });
  } catch (err) {
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

// Eliminar un recurso
export const deleteResource = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM recursos WHERE id_recurso = $1 RETURNING *', [id]);
    if (result.rows.length === 0)
      return res.status(404).json({ error: 'Recurso no encontrado' });

    res.json({ mensaje: 'Recurso eliminado' });
  } catch (err) {
    res.status(500).json({ error: 'Error en el servidor' });
  }
};
