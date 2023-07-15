import { Request, Response } from "express";
import { connect } from "../databases";
import { OkPacket  } from 'mysql2/promise';
import { Especialidad } from "../interfaces/Especialidad";


// ***** METODOS *****

// Obtener todas las especialidades
export async function getSpecialties(req: Request, res: Response){
    try {
        const conn = await connect();
        const query = `SELECT * FROM especialidades`;
        const [rows] = await conn.query(query);

        return res.json(rows);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error al obtener las especialidades' });
    }
}

// Obtener una especialidad por su Id
export async function getSpecialtyById(req: Request, res: Response){
    const { id } = req.params;

    try {
        const conn = await connect();
        const query = 'SELECT * FROM especialidades WHERE id = ?';
        const [rows] = await conn.query(query, [id]);
        
        if (!Array.isArray(rows) || rows.length === 0) {
            return res.status(404).json({ message: 'Especialidad no encontrada' });
        }

        const specialty = rows[0];
        return res.json(specialty);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error al obtener la especialidad' });
    }
}

// Crear una nueva especilidad
export async function createSpecialty(req: Request, res: Response){
    
    return undefined;
}

// Actualizar una especilidad existente por su Id
export async function updateSpecialty(req: Request, res: Response){
    
    return undefined;
}

// Eliminar una especilidad por su Id
export async function deleteSpecialty(req: Request, res: Response){
    
    return undefined;
}