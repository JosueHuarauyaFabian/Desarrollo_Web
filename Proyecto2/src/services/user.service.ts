import { User } from "../models/user.model";
import { UserRepository } from "../repositories/user.repository";

/**
 * Servicio que maneja la lógica de los usuarios.
 */
export class UserService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  /**
   * Retorna todos los usuarios.
   */
  async getAllUsers(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  /**
   * Retorna un usuario por su ID.
   */
  async getUserById(id: number): Promise<User | null> {
    return this.userRepository.findById(id);
  }

  /**
   * Crea un nuevo usuario.
   */
  async createUser(user: User): Promise<User> {
    return this.userRepository.create(user);
  }

  /**
   * Elimina un usuario por su ID.
   */
  async deleteUser(id: number): Promise<void> {
    return this.userRepository.delete(id);
  }
}
