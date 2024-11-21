import express from 'express';
import dotenv from 'dotenv';
import transactionRoutes from './routes/transactionRoutes';
import authRoutes from './routes/authRoutes';
import { connectDB } from './config/database';

dotenv.config();
const app = express();

// Conectar a la base de datos
connectDB();

// Middleware para analizar JSON
app.use(express.json());

// Endpoint raíz para mostrar un mensaje
app.get('/', (req, res) => {
  res.send('¡Bienvenido a la API de detección de fraudes!');
});

// Registrar las rutas
app.use('/api', transactionRoutes);
app.use('/auth', authRoutes);

const PORT = process.env.PORT || 3000;

// Iniciar el servidor
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
}

export default app;
