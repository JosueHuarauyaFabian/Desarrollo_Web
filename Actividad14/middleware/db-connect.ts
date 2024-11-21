import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Cargar las variables de entorno desde el archivo .env
dotenv.config();

const MONGO_URI = process.env.MONGO_URI || '';

if (!MONGO_URI) {
  throw new Error('La variable MONGO_URI no está definida en el archivo .env');
}

let isConnected = 0;

const dbConnect = async () => {
  if (isConnected) {
    console.log('Ya conectado a MongoDB');
    return;
  }

  try {
    const db = await mongoose.connect(MONGO_URI);
    isConnected = db.connections[0].readyState;
    console.log('Conectado a MongoDB:', db.connection.host);
  } catch (error: any) {
    console.error('Error al conectar con MongoDB:', error.message);
    throw new Error('Error al conectar con MongoDB');
  }
};

export default dbConnect;
