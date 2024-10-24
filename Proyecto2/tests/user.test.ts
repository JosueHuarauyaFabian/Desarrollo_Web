// Importamos la librería 'supertest' para realizar pruebas sobre la API
import request from 'supertest';
// Importamos la instancia de la aplicación desde 'app.ts' para realizar las pruebas
import app from '../src/app/app';
// Importamos la librería 'jsonwebtoken' para generar tokens JWT
import jwt from 'jsonwebtoken';

// Describimos el grupo de pruebas para la API de usuarios
describe("User API", () => {
  const secret = 'your_jwt_secret'; // Definimos la clave secreta utilizada para firmar los tokens JWT

  // Prueba para verificar que el endpoint GET /api/users retorna la lista de usuarios del CSV
  it("GET /api/users should return the list of users from the CSV", async () => {
    // Generamos un token JWT válido para autenticar la solicitud
    const token = jwt.sign({ userId: 1 }, secret);
    // Realizamos una solicitud GET al endpoint "/api/users" con el token en el header de autorización
    const response = await request(app)
      .get("/api/users")
      .set('Authorization', `Bearer ${token}`);

    // Verificamos que la respuesta tenga un código de estado 200 (solicitud exitosa)
    expect(response.status).toBe(200);
    // Verificamos que el cuerpo de la respuesta contenga usuarios, lo cual indica que fueron cargados correctamente desde el CSV
    expect(response.body.length).toBeGreaterThan(0);
  });
});
