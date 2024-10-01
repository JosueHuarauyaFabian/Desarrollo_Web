"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuperAdmin = void 0;
const admin_1 = require("./admin");
class SuperAdmin extends admin_1.Admin {
    constructor(nombre, correo) {
        super(nombre, correo);
    }
    gestionarSistema() {
        return 'Gestionar sistema completo';
    }
}
exports.SuperAdmin = SuperAdmin;
