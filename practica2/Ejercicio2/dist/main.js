"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const usuario_base_1 = require("./usuario-base");
const admin_1 = require("./admin");
const super_admin_1 = require("./super-admin");
const gestor_permisos_1 = require("./gestor-permisos");
// Crear instancias de los diferentes tipos de usuarios
const usuarioBase = new usuario_base_1.UsuarioBase('Juan', 'juan@correo.com');
const admin = new admin_1.Admin('Carlos', 'carlos@correo.com');
const superAdmin = new super_admin_1.SuperAdmin('Ana', 'ana@correo.com');
// Crear instancia del gestor de permisos
const gestor = new gestor_permisos_1.GestorDePermisos();
// Pruebas
console.log(usuarioBase.verPermisos()); // Permisos básicos
console.log(admin.gestionarUsuarios()); // Gestionar usuarios
console.log(superAdmin.gestionarSistema()); // Gestionar sistema completo
console.log(gestor.asignarPermisos(admin)); // Permisos intermedios: Gestionar usuarios
console.log(gestor.asignarPermisos(superAdmin)); // Permisos completos: Gestionar sistema y usuarios
// Usar el método agregado mediante prototipos
console.log(admin.actualizarConfiguraciones()); // Configuraciones actualizadas
