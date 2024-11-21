import WeatherModel from "./__mocks__/model";
import { WeatherInterface } from "./interface";

/**
 * Encuentra un registro por el código postal.
 * @param zip Código postal a buscar.
 * @returns Documento encontrado o null si no existe.
 */
export const findByZip = async (zip: string): Promise<WeatherInterface | null> => {
    return await WeatherModel.findOne({ zip });
};

/**
 * Almacena un nuevo documento en la base de datos.
 * @param data Datos del clima a guardar.
 * @returns true si el documento fue creado exitosamente.
 */
export const storeDocument = async (data: WeatherInterface): Promise<boolean> => {
    await WeatherModel.create(data);
    return true;
};

/**
 * Actualiza un documento existente basado en el código postal.
 * @param zip Código postal del documento a actualizar.
 * @param newData Nuevos datos para actualizar el documento.
 * @returns true si el documento fue actualizado exitosamente.
 */
export const updateByZip = async (zip: string, newData: WeatherInterface): Promise<boolean> => {
    await WeatherModel.updateOne({ zip }, newData);
    return true;
};

/**
 * Elimina un documento basado en el código postal.
 * @param zip Código postal del documento a eliminar.
 * @returns true si el documento fue eliminado exitosamente.
 */
export const deleteByZip = async (zip: string): Promise<boolean> => {
    await WeatherModel.deleteOne({ zip });
    return true;
};
