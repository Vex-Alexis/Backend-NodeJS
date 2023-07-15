export interface Doctor {
    id?: number;
    nombre: string;
    apellido: string;
    cedula: string;
    especialidad_id: number;
    consultorio: string;
    email: string;
    fecha_registro?: Date;
    [key: string]: any;
}