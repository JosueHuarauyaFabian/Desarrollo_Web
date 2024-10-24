"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.createUser = exports.getUserById = exports.getUsers = void 0;
const user_service_1 = require("../services/user.service");
const user_repository_1 = require("../repositories/user.repository");
// Crea una instancia del UserRepository para pasarlo al servicio
const userRepository = new user_repository_1.UserRepository();
const userService = new user_service_1.UserService(userRepository);
const getUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({ message: "Error al obtener usuarios" });
    }
};
exports.getUsers = getUsers;
const getUserById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const user = await userService.getUserById(id);
        if (user) {
            res.status(200).json(user);
        }
        else {
            res.status(404).json({ message: "User not found" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Error retrieving user" });
    }
};
exports.getUserById = getUserById;
const createUser = async (req, res) => {
    try {
        const newUser = req.body;
        const createdUser = await userService.createUser(newUser);
        res.status(201).json(createdUser);
    }
    catch (error) {
        res.status(400).json({ message: "Error creating user" });
    }
};
exports.createUser = createUser;
const deleteUser = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        await userService.deleteUser(id);
        res.status(200).json({ message: "User deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Error deleting user" });
    }
};
exports.deleteUser = deleteUser;
