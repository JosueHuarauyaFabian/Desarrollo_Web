import { UsuarioBase } from './usuario-base';
import { Admin } from './admin';
import { SuperAdmin } from './super-admin';
import { GestorDePermisos } from './gestor-permisos';

// Crear instancias de los diferentes tipos de usuarios
const usuarioBase = new UsuarioBase('Juan', 'juan@correo.com');
const admin = new Admin('Carlos', 'carlos@correo.com');
const superAdmin = new SuperAdmin('Ana', 'ana@correo.com');

// Crear instancia del gestor de permisos
const gestor = new GestorDePermisos<UsuarioBase>();

// Pruebas
console.log(usuarioBase.verPermisos()); // Permisos básicos
console.log(admin.gestionarUsuarios()); // Gestionar usuarios
console.log(superAdmin.gestionarSistema()); // Gestionar sistema completo

console.log(gestor.asignarPermisos(admin)); // Permisos intermedios: Gestionar usuarios
console.log(gestor.asignarPermisos(superAdmin)); // Permisos completos: Gestionar sistema y usuarios

// Usar el método agregado mediante prototipos
console.log((admin as any).actualizarConfiguraciones()); // Configuraciones actualizadas