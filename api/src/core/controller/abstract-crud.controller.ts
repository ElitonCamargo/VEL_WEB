import type { Request, Response } from "express";
import type { BaseEntity } from "../types/base.types.ts";
import { CrudService } from "../service/abstract-crud.service.ts";
import { CrudRepository } from "../repository/abstract-crud.repository.ts";
import { success } from "../utils/response.utils.ts"

export abstract class CrudController<
    T extends BaseEntity,
    R extends CrudRepository<T>,
    S extends CrudService<T, R>
> 
{
    protected service: S;

    constructor(service: S) {
        this.service = service;
    }

    create = async (req: Request, res: Response) => {
        const data = await this.service.create(req.body);

        return success<T>(res, {
            message: "Registro criado com sucesso",
            data,
            status: 201
        });
    };

    findById = async (req: Request, res: Response) => {
        const data = await this.service.findById(
            Number(req.params.id)
        );

        return success<T>(res, {
            data
        });
    };

    findAll = async (req: Request, res: Response) => {
        const data = await this.service.findAll();

        return success<T[]>(res, {
            data
        });
    };

    update = async (req: Request, res: Response) => {
        const data = await this.service.update(
            Number(req.params.id),
            req.body
        );

        return success<T>(res, {
            message: "Registro atualizado com sucesso",
            data
        });
    };

    delete = async (req: Request, res: Response) => {
        await this.service.softDelete(
            Number(req.params.id)
        );

        return success(res, {
            message: "Registro excluído com sucesso"
        });
    };
}