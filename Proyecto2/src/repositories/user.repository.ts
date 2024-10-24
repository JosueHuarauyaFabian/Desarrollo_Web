import { User } from "../models/user.model";
import fs from "fs";
import csvParser from "csv-parser";
import path from "path";

export class UserRepository {
  private users: User[] = [];

  constructor() {
    this.loadUsers(); // Carga los usuarios desde el archivo CSV
  }

  async loadUsers(): Promise<void> {
    this.users = [];
    const csvPath = path.resolve(__dirname, "../data/users.csv");

    return new Promise((resolve, reject) => {
      fs.createReadStream(csvPath)
        .pipe(csvParser())
        .on("data", (row) => {
          const user: User = {
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

  async findAll(): Promise<User[]> {
    return this.users;
  }

  async findById(id: number): Promise<User | null> {
    const user = this.users.find((u) => u.id === id);
    return user ? user : null;
  }

  async create(user: User): Promise<User> {
    user.id = this.users.length + 1;
    this.users.push(user);
    return user;
  }

  async delete(id: number): Promise<void> {
    const index = this.users.findIndex((u) => u.id === id);
    if (index !== -1) {
      this.users.splice(index, 1);
    } else {
      throw new Error("User not found");
    }
  }
}
