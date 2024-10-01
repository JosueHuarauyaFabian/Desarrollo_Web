"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioBase = void 0;
class UsuarioBase {
    constructor(nombre, correo) {
        this.nombre = nombre;
        this.correo = correo;
    }
    verPermisos() {
        return 'Permisos básicos';
    }
}
exports.UsuarioBase = UsuarioBase;
