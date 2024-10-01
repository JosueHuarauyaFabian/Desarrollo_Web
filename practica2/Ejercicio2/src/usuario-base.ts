export class UsuarioBase {
    nombre: string;
    correo: string;

    constructor(nombre: string, correo: string) {
        this.nombre = nombre;
        this.correo = correo;
    }

    verPermisos(): string {
        return 'Permisos básicos';
    }
}