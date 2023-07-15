import { Request, Response } from "express";
import { connect } from "../databases";
import { OkPacket  } from 'mysql2/promise';
import { Doctor } from "../interfaces/Doctor";

// Funcion para validar los campos obligatorios en el formulario
function validateFields(obj: Doctor, requiredFields: string[]) {
    for (const field of requiredFields) {
        if (!obj[field]) {
            throw new Error(`El campo '${field}' es requerido`);
        }
    }
}


// ***** METODOS *****

// Obtener todos los doctores
export async function getDoctors(req: Request, res: Response): Promise<Response> {
    try {
        const conn = await connect();
        const [rows] = await conn.
            query(`
                SELECT doctores.id, doctores.nombre, doctores.apellido, doctores.cedula, especialidades.nombre_especialidad AS especialidad, doctores.consultorio, doctores.email, doctores.fecha_registro
                FROM doctores
                INNER JOIN especialidades ON doctores.especialidad_id = especialidades.id
            `);
        return res.json(rows);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error al obtener los doctores' });
    }
}

// Obtener un doctor por su cédula
export async function getDoctorByCedula(req: Request, res: Response): Promise<Response> {
    const { cedula } = req.params;

    try {
        const conn = await connect();
        const [rows] = await conn.query('SELECT * FROM doctores WHERE cedula = ?', [cedula]);

        if (!Array.isArray(rows) || rows.length === 0) {
            return res.status(404).json({ message: 'Doctor no encontrado' });
        }

        return res.json(rows[0]);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error al obtener el doctor' });
    }
}


// Crear un nuevo doctor
export async function createDoctor(req: Request, res: Response): Promise<Response> {
    try {
        const newDoctor: Doctor = req.body;
        const requiredFields = ['nombre', 'apellido', 'cedula', 'especialidad_id', 'consultorio', 'email'];

        validateFields(newDoctor, requiredFields);

        const conn = await connect();
        await conn.query('INSERT INTO doctores SET ?', [newDoctor]);

        return res.status(201).json({
            success: true,
            message: 'Doctor creado exitosamente',
            data: {
                doctor: newDoctor,
            },
        });
    } catch (error) {
        console.log(error);

        if (error instanceof Error) {
            return res.status(400).json({ message: error.message });
        }

        return res.status(500).json({ message: 'Error al crear el doctor' });
    }
}

// Actualizar un doctor existente por su cedula
export async function updateDoctor(req: Request, res: Response): Promise<Response> {
    const { cedula } = req.params;
    const updateDoctor: Doctor = req.body;

    if (Object.keys(updateDoctor).length === 0) {
        return res.status(400).json({ message: 'No se actualizó ningún dato del doctor' });
    }    

    try {
        const conn = await connect();
        const [updateResult] = await conn.query(
            'UPDATE doctores set ? WHERE cedula = ?',
            [updateDoctor, cedula]
        );

        if ((updateResult as OkPacket).affectedRows === 0) {
            return res.status(404).json({ message: 'Doctor no encontrado' });
        }

        return res.json({ message: 'Doctor actualizado exitosamente' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error al actualizar el doctor' });
    }
}


// Eliminar un doctor por su ID
export async function deleteDoctor(req: Request, res: Response): Promise<Response> {
    const { cedula } = req.params;

    try {
        const conn = await connect();
        const [deleteResult] = await conn.query('DELETE FROM doctores WHERE cedula = ?', [cedula]);

        if ((deleteResult as OkPacket).affectedRows === 0) {
            return res.status(404).json({ message: 'Doctor no encontrado' });
        }

        return res.json({ message: 'Doctor eliminado exitosamente' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error al eliminar el doctor' });
    }
}