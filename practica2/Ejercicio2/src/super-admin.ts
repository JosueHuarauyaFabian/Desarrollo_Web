import { Admin } from './admin';

export class SuperAdmin extends Admin {
    constructor(nombre: string, correo: string) {
        super(nombre, correo);
    }

    gestionarSistema(): string {
        return 'Gestionar sistema completo';
    }
}