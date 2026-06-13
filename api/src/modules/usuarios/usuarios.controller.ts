import { UsuariosService } from "./usuarios.service.ts";
import type { Request, Response } from "express";
import type { Usuario } from "./usuarios.types.ts";
import { success } from "../../core/utils/response.utils.ts";
import { CrudController } from "../../core/controller/abstract-crud.controller.ts";
import { CrudRepository } from "../../core/repository/abstract-crud.repository.ts";

export class UsuariosController extends CrudController<Usuario, CrudRepository<Usuario>, UsuariosService> {
    constructor() {
        super(new UsuariosService());
    }

    // create = async (req: Request, res: Response) => {
    //     const data = await this.service.create(req.body);
    //     return success<Usuario>(res, {
    //         message: "Usuário criado com sucesso",
    //         data,
    //         status: 201
    //     });
    // };

    // findAll = async (req: Request, res: Response) => {
    //     const data = await this.service.findAll();
    //     return success<Usuario[]>(res, {
    //         data
    //     });
    // };
}
