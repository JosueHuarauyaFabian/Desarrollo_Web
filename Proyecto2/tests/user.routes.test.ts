// Importamos request de supertest para realizar pruebas HTTP
import request from 'supertest';
// Importamos la instancia de la aplicación desde el archivo app.ts
import app from '../src/app/app';

// Descripción del grupo de pruebas de integración para la API de usuarios
describe('User API Integration Tests', () => {
  let token: string; // Variable para almacenar el token JWT generado

  // Antes de cada prueba, autenticamos al usuario y obtenemos un token JWT
  beforeEach(async () => {
    // Realizamos una solicitud POST a la ruta de login para autenticar al usuario
    const loginResponse = await request(app)
      .post('/api/auth/login')
      .send({ username: 'admin', password: 'password' }); // Enviamos las credenciales para autenticación
    
    // Almacenamos el token obtenido en la variable `token` para usarlo en las siguientes solicitudes
    token = loginResponse.body.token;
  });

  // Caso de prueba: debería crear un nuevo usuario con una solicitud POST
  it('should create a new user with a POST request', async () => {
    // Definimos un nuevo usuario que se enviará en la solicitud
    const newUser = { id: 4, name: 'Alice Brown', email: 'alice@example.com', password: 'password123' };
    
    // Realizamos una solicitud POST a la ruta /api/users con el nuevo usuario y el token de autorización
    const response = await request(app)
      .post('/api/users')
      .set('Authorization', `Bearer ${token}`) // Añadimos el token en el header
      .send(newUser);
    
    // Verificamos que la respuesta sea un código 201 (Usuario creado)
    expect(response.status).toBe(201);
    // Verificamos que el nombre del usuario creado sea 'Alice Brown'
    expect(response.body.name).toBe('Alice Brown');
  });

  // Caso de prueba: debería devolver un usuario específico con una solicitud GET
  it('should return a specific user with a GET request', async () => {
    // Realizamos una solicitud GET a la ruta /api/users/1 para obtener el usuario con ID 1
    const response = await request(app)
      .get('/api/users/1')
      .set('Authorization', `Bearer ${token}`); // Añadimos el token en el header
    
    // Verificamos que la respuesta sea un código 200 (Solicitud exitosa)
    expect(response.status).toBe(200);
    // Verificamos que el ID del usuario devuelto sea 1
    expect(response.body.id).toBe(1);
  });

  // Caso de prueba: debería eliminar un usuario con una solicitud DELETE
  it('should delete a user with a DELETE request', async () => {
    // Realizamos una solicitud DELETE a la ruta /api/users/1 para eliminar el usuario con ID 1
    const response = await request(app)
      .delete('/api/users/1')
      .set('Authorization', `Bearer ${token}`); // Añadimos el token en el header
    
    // Verificamos que la respuesta sea un código 200 (Eliminación exitosa)
    expect(response.status).toBe(200);
    // Verificamos que el mensaje devuelto sea 'User deleted successfully'
    expect(response.body.message).toBe('User deleted successfully');
  });
});
