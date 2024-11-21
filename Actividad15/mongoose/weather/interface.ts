export interface WeatherInterface {
    zip: string;      // Código postal
    weather: string;  // Estado del clima
    tempC: string;    // Temperatura en grados Celsius
    tempF: string;    // Temperatura en grados Fahrenheit
    friends: string[]; // Lista de códigos postales relacionados
}
