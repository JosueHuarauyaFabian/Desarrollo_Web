import { UsuarioBase } from './usuario-base';
import { Admin } from './admin';
import { SuperAdmin } from './super-admin';

export class GestorDePermisos<T extends UsuarioBase> {
    asignarPermisos(usuario: T): string {
        if (usuario instanceof SuperAdmin) {
            return 'Permisos completos: Gestionar sistema y usuarios';
        } else if (usuario instanceof Admin) {
            return 'Permisos intermedios: Gestionar usuarios';
        } else {
            return 'Permisos básicos';
        }
    }
}