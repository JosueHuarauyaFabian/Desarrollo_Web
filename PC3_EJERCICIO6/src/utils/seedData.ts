import mongoose from 'mongoose';
import Transaction from '../models/transaction';
import dotenv from 'dotenv';

dotenv.config(); // Carga las variables de entorno desde el archivo .env

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!); // Conexión a MongoDB
    console.log('Conexión a MongoDB exitosa.');

    // Limpia la colección de transacciones
    await Transaction.deleteMany({});
    console.log('Colección de transacciones limpiada.');

    // Datos iniciales simulados
    const transactions = [
      {
        userId: 'user1',
        amount: 5000,
        date: new Date('2024-11-01'),
        description: 'Compra en supermercado',
        isFraudulent: false,
      },
      {
        userId: 'user2',
        amount: 15000,
        date: new Date('2024-11-02'),
        description: 'Transferencia bancaria',
        isFraudulent: true,
      },
      {
        userId: 'user3',
        amount: 7000,
        date: new Date('2024-11-03'),
        description: 'Pago de alquiler',
        isFraudulent: false,
      },
    ];

    // Inserta los datos simulados
    await Transaction.insertMany(transactions);
    console.log('Datos simulados insertados correctamente.');

    mongoose.disconnect();
    console.log('Desconectado de MongoDB.');
  } catch (error) {
    console.error('Error poblando datos iniciales:', error);
    process.exit(1);
  }
};

seedData();
