import type { NextApiRequest, NextApiResponse } from "next";
import fetch from 'node-fetch';

type ResponseItemType = {
    id: string;
    name: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseItemType[] | { error: string; details?: string }>
) {
    const url = "https://jsonplaceholder.typicode.com/users"; // URL de ejemplo para obtener los datos
    let data: ResponseItemType[];

    try {
        const response = await fetch(url);

        // Verifica si la respuesta de la API externa es exitosa
        if (!response.ok) {
            return res.status(404).json({ error: "External API not found", details: response.statusText });
        }

        // Parsea los datos obtenidos de la API
        data = (await response.json()) as ResponseItemType[];
    } catch (error) {
        // Captura y maneja cualquier error de red o de parsing
        console.error("Error fetching data:", error);
        return res.status(500).json({ error: "Internal Server Error", details: String(error) });
    }

    // Mapea los datos y asegura que `id` esté en formato de string
    const names = data.map((item) => ({
        id: item.id.toString(),
        name: item.name,
    }));

    return res.status(200).json(names);
}
