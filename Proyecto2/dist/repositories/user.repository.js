"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const fs_1 = __importDefault(require("fs"));
const csv_parser_1 = __importDefault(require("csv-parser"));
const path_1 = __importDefault(require("path"));
class UserRepository {
    constructor() {
        this.users = [];
        this.loadUsers(); // Carga los usuarios desde el archivo CSV
    }
    async loadUsers() {
        this.users = [];
        const csvPath = path_1.default.resolve(__dirname, "../data/users.csv");
        return new Promise((resolve, reject) => {
            fs_1.default.createReadStream(csvPath)
                .pipe((0, csv_parser_1.default)())
                .on("data", (row) => {
                const user = {
                    id: parseInt(row.id),
                    name: row.name,
                    email: row.email,
                    password: row.password,
                };
                this.users.push(user);
            })
                .on("end", () => {
                resolve();
            })
                .on("error", (error) => {
                reject(error);
            });
        });
    }
    async findAll() {
        return this.users;
    }
    async findById(id) {
        const user = this.users.find((u) => u.id === id);
        return user ? user : null;
    }
    async create(user) {
        user.id = this.users.length + 1;
        this.users.push(user);
        return user;
    }
    async delete(id) {
        const index = this.users.findIndex((u) => u.id === id);
        if (index !== -1) {
            this.users.splice(index, 1);
        }
        else {
            throw new Error("User not found");
        }
    }
}
exports.UserRepository = UserRepository;
