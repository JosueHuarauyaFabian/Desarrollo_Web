import mongoose from 'mongoose'; // Agregar esta línea para importar mongoose
import dbConnect from '../middleware/db-connect';
import Weather from '../mongoose/weather/weatherModel';

const testDb = async () => {
  try {
    // Conectar a la base de datos
    await dbConnect();

    // Buscar un documento en la colección "weather"
    const data = await Weather.findOne({ zip: '12345' });
    if (data) {
      console.log('Datos encontrados:', data);
    } else {
      console.log('No se encontró información para el código postal 12345.');
    }
  } catch (error: any) {
    console.error('Error en la conexión o consulta:', error.message);
  } finally {
    // Cierra la conexión para evitar fugas de memoria
    await mongoose.disconnect(); // Llamada a disconnect usando mongoose
    console.log('Conexión cerrada.');
  }
};

testDb();
