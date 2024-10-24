// Importamos el servicio de usuarios desde la ubicación especificada
import { UserService } from '../src/services/user.service';
// Importamos el repositorio de usuarios desde la ubicación especificada
import { UserRepository } from '../src/repositories/user.repository';
// Importamos el módulo 'path' para trabajar con rutas de archivos
import path from 'path';

// Describimos el grupo de pruebas para el servicio de usuarios
describe('UserService', () => {
  let userService: UserService; // Variable que contendrá la instancia del servicio de usuarios

  // Antes de cada prueba, creamos una nueva instancia del repositorio y el servicio de usuarios
  beforeEach(async () => {
    // Creamos una instancia de UserRepository
    const userRepository = new UserRepository();
    // Creamos una instancia de UserService y pasamos el repositorio como argumento
    userService = new UserService(userRepository);

    // Aseguramos que los usuarios se carguen desde el CSV antes de ejecutar las pruebas
    await userService['userRepository'].loadUsers();
  });

  // Prueba para verificar que el servicio retorna un arreglo con usuarios cargados desde el CSV
  it('should return an array with users from the CSV', async () => {
    // Obtenemos los usuarios mediante el servicio
    const users = await userService.getAllUsers();
    // Verificamos que la cantidad de usuarios sea mayor que 0, indicando que se han cargado usuarios
    expect(users.length).toBeGreaterThan(0);
  });

  // Prueba para verificar que el servicio crea un nuevo usuario correctamente
  it('should create a new user', async () => {
    // Definimos un nuevo usuario que se enviará para crear
    const newUser = { id: 4, name: 'Alice Brown', email: 'alice@example.com', password: 'password123' };
    // Utilizamos el servicio para crear el usuario
    const createdUser = await userService.createUser(newUser);
    // Verificamos que el usuario creado sea igual al nuevo usuario definido
    expect(createdUser).toEqual(newUser);
  });
  
});
