"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
/**
 * Servicio que maneja la lógica de los usuarios.
 */
class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    /**
     * Retorna todos los usuarios.
     */
    async getAllUsers() {
        return this.userRepository.findAll();
    }
    /**
     * Retorna un usuario por su ID.
     */
    async getUserById(id) {
        return this.userRepository.findById(id);
    }
    /**
     * Crea un nuevo usuario.
     */
    async createUser(user) {
        return this.userRepository.create(user);
    }
    /**
     * Elimina un usuario por su ID.
     */
    async deleteUser(id) {
        return this.userRepository.delete(id);
    }
}
exports.UserService = UserService;
