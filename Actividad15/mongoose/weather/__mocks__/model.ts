import { WeatherInterface } from "../interface";

type param = {
    [key: string]: string;
};

const WeatherModel = {
    create: jest.fn((newData: WeatherInterface) => Promise.resolve(true)), // Mock de creación
    findOne: jest.fn(({ zip: paramZip }: param) => 
        Promise.resolve({ zip: paramZip, weather: "sunny", tempC: "25", tempF: "77", friends: [] }) // Mock de búsqueda
    ),
    updateOne: jest.fn(({ zip: paramZip }: param, newData: WeatherInterface) =>
        Promise.resolve(true) // Mock de actualización
    ),
    deleteOne: jest.fn(({ zip: paramZip }: param) => Promise.resolve(true)), // Mock de eliminación
};

export default WeatherModel;
