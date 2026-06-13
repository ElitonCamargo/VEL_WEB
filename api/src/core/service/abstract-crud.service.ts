import type { OrderBy, Filter, Pagination} from "../types/query.types.ts";

import { CrudRepository } from "../repository/abstract-crud.repository.ts";
import type { BaseEntity } from "../types/base.types.ts";

export abstract class CrudService<T extends BaseEntity, R extends CrudRepository<T>> {
    protected repository: R;

    constructor(repository: R) {
        this.repository = repository;
    }

    async findById(id: number): Promise<T | null> {
        return this.repository.findById(id);
    }

    async findAll(pagination?: Pagination, orderBy?: OrderBy): Promise<T[]> {
        return this.repository.findAll(pagination, orderBy);
    }

    async findAllWithFilters(filters: Filter[], pagination?: Pagination, orderBy?: OrderBy): Promise<T[]> {
        return this.repository.findAllWithFilters(filters, pagination, orderBy);
    }

    async update(id: number, data: Partial<T>): Promise<T | null> {
        return this.repository.update(id, data);
    }

    async create(data: Partial<T>): Promise<T | null> {
        return this.repository.create(data);
    }

    async softDelete(id: number): Promise<boolean> {
        return this.repository.softDelete(id);
    }

    async hardDelete(id: number): Promise<boolean> {
        return this.repository.hardDelete(id);
    }

    async restore(id: number): Promise<boolean> {
        return this.repository.restore(id);
    }
}