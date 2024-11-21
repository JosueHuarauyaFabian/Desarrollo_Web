import Weather from './weatherModel';

export const findByZip = async (zip: string) => {
  try {
    const result = await Weather.findOne({ zip });
    if (!result) {
      throw new Error(`No se encontró información para el código postal: ${zip}`);
    }
    return result;
  } catch (error) {
    console.error(`Error al buscar por ZIP ${zip}:`, error);
    throw error;
  }
};

export const updateByZip = async (zip: string, data: any) => {
  try {
    const result = await Weather.findOneAndUpdate({ zip }, data, { new: true });
    if (!result) {
      throw new Error(`No se encontró información para el código postal: ${zip}`);
    }
    return result;
  } catch (error) {
    console.error(`Error al actualizar por ZIP ${zip}:`, error);
    throw error;
  }
};

export const deleteByZip = async (zip: string) => {
  try {
    const result = await Weather.findOneAndDelete({ zip });
    if (!result) {
      throw new Error(`No se encontró información para el código postal: ${zip}`);
    }
    return result;
  } catch (error) {
    console.error(`Error al eliminar por ZIP ${zip}:`, error);
    throw error;
  }
};
