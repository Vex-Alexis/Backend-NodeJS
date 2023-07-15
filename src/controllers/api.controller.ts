import { Request, Response } from "express";
import { connect } from "../databases";
import { Api } from '../interfaces/Api';

export async function getApis(req: Request, res: Response): Promise<Response>{
    const conn = await connect();
    
    const doctors = await conn
        .query(`
        SELECT doctores.id, doctores.nombre, doctores.apellido, doctores.cedula, especialidades.nombre_especialidad AS especialidad, doctores.consultorio, doctores.email, doctores.fecha_registro
        FROM doctores
        INNER JOIN especialidades ON doctores.especialidad_id = especialidades.id
        `);
    return res.json(doctors[0]);
}

export async function postApi(req:Request, res: Response) {
    const newPost: Api = req.body;
    const conn = await connect();
    await conn.query('INSERT INTO doctores SET ?', [newPost]);    
    return res.json({
        message: 'Doctor creado'
    })
}


export async function getApi(req: Request, res: Response): Promise<Response>{
    const cedula = req.params.cedula;
    const conn = await connect();
    const doctor = await conn.query(`SELECT * FROM doctores WHERE cedula = ?`, [cedula]);
    return res.json(doctor[0]);
}

export async function deleteApi(req: Request, res: Response){
    const id = req.params.id;
    const conn = await connect();
    await conn.query(`DELETE FROM doctores WHERE id = ?`, [id]);
    return res.json({
        message: 'Doctor eliminado de la Base de datos'
    });
}


export async function updateApi(req: Request, res: Response){
    const id = req.params.id;
    const updateApi: Api = req.body;
    const conn = await connect();
    await conn.query(`UPDATE doctores set ? WHERE id = ?`, [updateApi, id]);
    return res.json({
        message: 'Doctor actualizado'
    });
}