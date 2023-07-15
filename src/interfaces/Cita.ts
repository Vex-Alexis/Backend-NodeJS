export interface Cita {
    id?: number;
    paciente_id: number;
    doctor_id: number;
    especialidad_id: number;
    fecha_hora?: Date;
    [key: string]: any;
}