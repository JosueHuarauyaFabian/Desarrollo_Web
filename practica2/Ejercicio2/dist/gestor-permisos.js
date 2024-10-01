"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GestorDePermisos = void 0;
const admin_1 = require("./admin");
const super_admin_1 = require("./super-admin");
class GestorDePermisos {
    asignarPermisos(usuario) {
        if (usuario instanceof super_admin_1.SuperAdmin) {
            return 'Permisos completos: Gestionar sistema y usuarios';
        }
        else if (usuario instanceof admin_1.Admin) {
            return 'Permisos intermedios: Gestionar usuarios';
        }
        else {
            return 'Permisos básicos';
        }
    }
}
exports.GestorDePermisos = GestorDePermisos;
