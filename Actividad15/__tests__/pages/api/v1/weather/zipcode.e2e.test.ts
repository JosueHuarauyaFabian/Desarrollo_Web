/**
 * @jest-environment node
 */
const fetch = require("node-fetch"); // Cambia a import si usas ES Modules

jest.setTimeout(20000); // Configura un tiempo de espera extendido para la prueba

interface WeatherResponse {
  zip: string; // Define las propiedades esperadas en la respuesta
}

describe("The API /v1/weather/[zipcode]", () => {
  test("returns the correct data for the zipcode 96815", async () => {
    const zip = "96815";
    const response = await fetch(`http://localhost:3000/api/v1/weather/${zip}`);
    const body: WeatherResponse = await response.json(); // Especifica el tipo aquí
    expect(body.zip).toEqual(zip);
  });
});

export {};
