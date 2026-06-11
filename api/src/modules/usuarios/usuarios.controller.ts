import { UsuariosService } from "./usuarios.service.ts";
import type { Request, Response } from "express";

export class UsuariosController {
    protected service: UsuariosService;
    constructor() {
        this.service = new UsuariosService();
    }

    create = async (req: Request, res: Response) => {
        const data = await this.service.create(req.body);
        res.status(201).json(data);
    };

    fildAll = async (req: Request, res: Response) => {
        const data = await this.service.fildAll();
        res.status(200).json(data);
    };
}
