import { Request, Response } from "express";
import { connect } from "../databases";
import { OkPacket } from 'mysql2/promise';
import { Paciente } from "../interfaces/Paciente";



// Funcion para validar los campos obligatorios en el formulario
function validateFields(obj: Paciente, requiredFields: string[]) {
    for (const field of requiredFields) {
        if (!obj[field]) {
            throw new Error(`El campo '${field}' es requerido`);
        }
    }
}


// ***** METODOS *****

// Obtener todos los pacientes
export async function getPatients(req: Request, res: Response): Promise<Response> {
    try {
        //Establecer conexion a la base de datos
        const conn = await connect();

        //Ejecutar consulta SQL
        const query = `
            SELECT * FROM pacientes
        `;

        //Extraer el primer elemento de la consulta
        const [rows] = await conn.query(query);

        //Obtener la respuesta del obejto 'res' en formato JSON 
        return res.json(rows);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error al obtener los pacientes' });
    }
}


// Obtener un paciente por su cédula
export async function getPatientByCedula(req: Request, res: Response) {
    const { cedula } = req.params;

    try {
        const conn = await connect();
        const query = 'SELECT * FROM pacientes WHERE cedula = ?';
        const [rows] = await conn.query(query, [cedula]);

        if (!Array.isArray(rows) || rows.length === 0) {
            return res.status(404).json({ message: 'Paciente no encontrado' });
        }

        const paciente = rows[0];
        return res.json(paciente);
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error al obtener el paciente' });
    }
}


// Crear un nuevo paciente
export async function createPatient(req: Request, res: Response): Promise<Response> {
    const newPatient: Paciente = req.body;

    try {
        const requiredFields = ['nombre', 'apellido', 'cedula', 'edad', 'telefono', 'email', 'fecha_nacimiento'];

        validateFields(newPatient, requiredFields);
        
        const conn = await connect();
        await conn.query('INSERT INTO pacientes SET ?', [newPatient]);

        return res.status(201).json({
            success: true,
            message: 'Paciente creado exitosamente',
            data: {
                patient: newPatient,
            },
        });
    } catch (error) {
        console.log(error);

        if (error instanceof Error) {
            return res.status(400).json({ message: error.message });
        }
        
        return res.status(500).json({ message: 'Error al crear el paciente' });
    }
}


// Actualizar un paciente existente por su cedula
export async function updatePatient(req: Request, res: Response): Promise<Response> {
    const { cedula } = req.params;
    const updatePatient: Paciente = req.body;

    if (Object.keys(updatePatient).length === 0) {
        return res.status(400).json({ message: 'No se actualizó ningún dato del paciente' });
    }

    try {
        const conn = await connect();
        const query = 'UPDATE pacientes SET ? WHERE cedula = ?';
        const [updateResult] = await conn.query(query, [updatePatient, cedula]);

        if ((updateResult as OkPacket).affectedRows === 0) {
            return res.status(404).json({ message: 'Paciente no encontrado' });
        }

        return res.json({ message: 'Paciente actualizado exitosamente' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error al actualizar el paciente' });
    }
}


// Eliminar un paciente por su cedula
export async function deletePatient(req: Request, res: Response): Promise<Response> {
    const { cedula } = req.params;

    try {
        const conn = await connect();
        const query = 'DELETE FROM pacientes WHERE cedula = ?';
        const [deleteResult] = await conn.query(query, [cedula]);

        if ((deleteResult as OkPacket).affectedRows === 0) {
            return res.status(404).json({ message: 'Paciente no encontrado' });
        }

        return res.json({ message: 'Paciente eliminado exitosamente' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error al eliminar el paciente con cedula' });
    }
}
