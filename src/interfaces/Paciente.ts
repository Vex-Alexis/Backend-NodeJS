export interface Paciente {
    id?: number;
    nombre: string;
    apellido: string;
    cedula: string;
    edad: number;
    telefono: number;
    email: string;
    fecha_nacimiento: Date;
    fecha_registro?: Date;
    [key: string]: any;
}