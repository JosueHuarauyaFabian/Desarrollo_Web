"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Admin = void 0;
const usuario_base_1 = require("./usuario-base");
class Admin extends usuario_base_1.UsuarioBase {
    constructor(nombre, correo) {
        super(nombre, correo);
    }
    gestionarUsuarios() {
        return 'Gestionar usuarios';
    }
}
exports.Admin = Admin;
// Agregar método usando prototipo (no modificar directamente la clase)
Admin.prototype.actualizarConfiguraciones = function () {
    return 'Configuraciones actualizadas';
};
