// src/routes/resourceRoutes.ts

import { Router } from 'express';
import {
  createResource,
  getResources,
  updateResource,
  deleteResource,
} from '../controllers/resourceController';
import { verifyToken } from '../middlewares/authMiddleware';
import { logActivity } from '../middlewares/logMiddleware';

const router = Router();

// Aplicar middlewares a todas las rutas
router.use(verifyToken);

// Rutas para los recursos
router.post('/', logActivity('Crear recurso'), createResource);
router.get('/', logActivity('Obtener recursos'), getResources);
router.put('/:id', logActivity('Actualizar recurso'), updateResource);
router.delete('/:id', logActivity('Eliminar recurso'), deleteResource);

export default router;
