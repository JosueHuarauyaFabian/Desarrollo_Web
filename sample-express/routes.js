import fetch from "node-fetch";
import https from "https";

const agent = new https.Agent({
  rejectUnauthorized: false,  // Ignorar certificados autofirmados
});

const routeHello = () => "Hello World!";

// URL de prueba de la API JSONPlaceholder
const routeAPINames = async () => {
  const url = "https://jsonplaceholder.typicode.com/users";

  let data;
  try {
    const response = await fetch(url, { agent });

    // Verificar si la respuesta es JSON
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error("La respuesta no es JSON.");
    }

    data = await response.json();
  } catch (err) {
    return `Error fetching data: ${err.message}`;
  }

  const names = data
    .map((item) => `ID: ${item.id}, Name: ${item.name}`)
    .join("<br>");

  return names;
};

export { routeHello, routeAPINames };
