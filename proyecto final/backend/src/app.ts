import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import passport from 'passport';
import path from 'path';

import passportConfig from './utils/passport';
passportConfig;

import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import resourceRoutes from './routes/resourceRoutes';

import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

const swaggerDocument = YAML.load(path.resolve(__dirname, '../swagger.yaml'));

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Inicializar Passport
app.use(passport.initialize());

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/resources', resourceRoutes);

// Ruta para documentación con Swagger
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default app;
