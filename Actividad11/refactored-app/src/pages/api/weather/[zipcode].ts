import type { NextApiRequest, NextApiResponse } from "next";

type WeatherDetailType = {
    zipcode: string;
    weather: string;
    temp: number;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<WeatherDetailType | { error: string; details?: string }>
) {
    const { zipcode, tempUnit } = req.query;
    let temp = 35; // Base en Celsius

    // Validación del formato del código postal
    if (typeof zipcode !== "string" || zipcode.length !== 5) {
        return res.status(400).json({ error: "Invalid zipcode format" });
    }

    // Convertir la temperatura a Fahrenheit si el parámetro tempUnit es "imperial"
    if (tempUnit === "imperial") {
        temp = Math.round((temp * 9 / 5) + 32); // Conversión a Fahrenheit
    }

    return res.status(200).json({
        zipcode,
        weather: "sunny",
        temp,
    });
}
