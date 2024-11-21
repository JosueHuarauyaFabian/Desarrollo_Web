import mongoose from 'mongoose';

export const connectDB = async (): Promise<void> => {
  if (!process.env.MONGO_URI) {
    console.error('Error: La variable MONGO_URI no está configurada.');
    process.exit(1);
  }

  try {
    await mongoose.connect(process.env.MONGO_URI); // Simplificado
    console.log('Conexión a MongoDB exitosa.');
  } catch (error) {
    console.error('Error conectando a MongoDB:', error);
    process.exit(1);
  }
};
