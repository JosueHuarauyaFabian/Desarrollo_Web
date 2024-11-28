export interface LogActividad {
    id_log?: number;
    id_usuario: number;
    accion: string;
    fecha_hora?: Date;
    ip_origen: string;
  }
  