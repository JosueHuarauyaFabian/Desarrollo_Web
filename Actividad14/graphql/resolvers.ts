import { findByZip, updateByZip, deleteByZip } from '../mongoose/weather/services';

export const resolvers = {
  Query: {
    weather: async (_: any, { zip }: { zip: string }) => {
      try {
        console.log(`Buscando información para ZIP: ${zip}`);
        const weatherData = await findByZip(zip);
        console.log(`Datos encontrados para ZIP (${zip}):`, weatherData);
        return weatherData;
      } catch (error) {
        console.error(`Error al buscar información del clima para ZIP (${zip}):`, error);
        throw new Error('Error al buscar información del clima');
      }
    },
  },
  Mutation: {
    updateWeather: async (_: any, { zip, data }: { zip: string; data: any }) => {
      try {
        const updatedWeather = await updateByZip(zip, data);
        console.log(`Datos actualizados para ZIP (${zip}):`, updatedWeather);
        return updatedWeather;
      } catch (error) {
        console.error(`Error al actualizar información del clima para ZIP (${zip}):`, error);
        throw new Error('Error al actualizar información del clima');
      }
    },
    deleteWeather: async (_: any, { zip }: { zip: string }) => {
      try {
        const deletedWeather = await deleteByZip(zip);
        console.log(`Registro eliminado para ZIP (${zip}):`, deletedWeather);
        return deletedWeather;
      } catch (error) {
        console.error(`Error al eliminar información del clima para ZIP (${zip}):`, error);
        throw new Error('Error al eliminar información del clima');
      }
    },
  },
};
