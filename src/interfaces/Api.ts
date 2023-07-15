export interface Api {
    id?: number;
    nombre: string;
    apellido: string;
    especialidad: number;
    consultorio: string;
    email: string;
    fecha_registro?: Date;
}
