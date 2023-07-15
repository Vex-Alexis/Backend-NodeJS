import { Request, Response } from "express";
import { connect } from "../databases";
import { OkPacket  } from 'mysql2/promise';
import { Cita } from "../interfaces/Cita";

// Funcion para validar los campos obligatorios en el formulario
function validateFields(obj: Cita, requiredFields: string[]) {
    for (const field of requiredFields) {
        if (!obj[field]) {
            throw new Error(`El campo '${field}' es requerido`);
        }
    }
}

// ***** METODOS *****

// Obtener todas los citas medicas
export async function getQuotes(req: Request, res: Response){
    try {
        const conn = await connect();
        const query = `SELECT * FROM citas`;
        const [rows] = await conn.query(query);

        if (!Array.isArray(rows) || rows.length === 0) {
            return res.status(200).json({ message: 'No hay citas médicas' });
        }

        return res.json(rows);
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error al obtener las citas médicas' });
    }
}

// Obtener cita medica por ID
export async function getQuoteById(req: Request, res: Response){
    
    return undefined;
}

// Crear una nueva cita medica
export async function createQuote(req: Request, res: Response){
    const newQuote: Cita = req.body;

    try {
        const requiredFields = ['paciente_id', 'doctor_id'];

        validateFields(newQuote, requiredFields);

        const conn = await connect();
        await conn.query('INSERT INTO citas SET ?', [newQuote]);

        return res.status(201).json({
            success: true,
            message: 'Cita médica creada exitosamente',
            data: {
                quote: newQuote,
            },
        });        
    } catch (error) {
        console.log(error);

        if (error instanceof Error) {
            return res.status(400).json({ message: error.message });
        }
        
        return res.status(500).json({ message: 'Error al crear cita médica' });
    }
}

// Actualizar una cita medica existente por su ID
export async function updateQuote(req: Request, res: Response){
    
    return undefined;
}

// Eliminar una cita medica por su ID
export async function deleteQuote(req: Request, res: Response){
    
    return undefined;
}