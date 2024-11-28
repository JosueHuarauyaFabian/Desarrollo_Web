export interface User {
  id_usuario?: number;
  nombre: string;
  email: string;
  contraseña?: string;
  rol: 'Administrador' | 'Operador';
  fecha_registro?: Date;
}
