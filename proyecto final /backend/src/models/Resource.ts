export interface Resource {
    id_recurso?: number;
    tipo_recurso: 'Servidor' | 'Base de Datos';
    configuracion: string;
    estado: 'Activo' | 'Inactivo';
    fecha_creacion?: Date;
    id_usuario: number;
  }
  