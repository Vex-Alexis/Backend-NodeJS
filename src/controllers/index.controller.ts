import { Request, Response } from "express";
import config from "../config";

export function indexWelcome(req: Request, res: Response): Response {
    return res.json(`${config.DB_HOST}:${config.PORT}/api/v1`)
}

