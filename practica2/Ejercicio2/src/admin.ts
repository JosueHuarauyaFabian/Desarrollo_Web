import { UsuarioBase } from './usuario-base';

export class Admin extends UsuarioBase {
    constructor(nombre: string, correo: string) {
        super(nombre, correo);
    }

    gestionarUsuarios(): string { 
        return 'Gestionar usuarios';
    }
}

// Agregar método usando prototipo (no modificar directamente la clase) 
Admin.prototype.actualizarConfiguraciones = function (): string {
    return 'Configuraciones actualizadas';
};   