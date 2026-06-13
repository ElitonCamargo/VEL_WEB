import pool from "./connection.ts";
import type { OrderBy, Filter, Pagination} from "../types/query.types.ts";
import type { Pool, ResultSetHeader } from "mysql2/promise";
import type { BaseEntity } from "../types/base.types.ts";


export abstract class CrudRepository<T extends BaseEntity> {
    protected table: string;
    protected db: Pool;
    protected softDeleteEnabled: boolean = true;
    
    constructor(table: string, softDeleteEnabled: boolean = true) {
        this.table = table;
        this.db = pool;
        this.softDeleteEnabled = softDeleteEnabled;
    }

    protected formatData(data: any): any {
        const formatted: any = {};

        for (const key in data) {
            const value = data[key];

            if (typeof value === "object" && value !== null && !(value instanceof Date)) {
                formatted[key] = JSON.stringify(value);
            } else {
                formatted[key] = value;
            }
        }

        return formatted;
    }


    async findById(id: number): Promise<T | null> {
        const [rows] = await this.db.query(
            `SELECT * FROM ${this.table} WHERE id = ? ${this.softDeleteEnabled ? "AND deleted_at IS NULL" : ""} LIMIT 1`,
            [id]
        );

        const result = rows as T[];
        return result.length ? result[0] : null;
    }

    async findAll(pagination?: Pagination, orderBy?: OrderBy): Promise<T[]> {
        let query = `SELECT * FROM ${this.table}`;
        const values: string[] = [];

        if (this.softDeleteEnabled) {
            query += ` WHERE deleted_at IS NULL`;
        }

        
        if (orderBy) {
            query += ` ORDER BY ${orderBy.column} ${orderBy.direction}`;
        }
        
        if (pagination) {
            query += ` LIMIT ? OFFSET ?`;
            values.push(String(pagination.limit));
            values.push(String(pagination.offset));
        }


        const [rows] = await this.db.query(query, values);

        return rows as T[];
    }

    async findAllWithFilters(filters: Filter[], pagination?: Pagination, orderBy?: OrderBy): Promise<T[]> {

        let query = `SELECT * FROM ${this.table}`;

        const conditions: string[] = [];
        const values: unknown[] = [];

        if (this.softDeleteEnabled) {
            conditions.push("deleted_at IS NULL");
        }

        for (const filter of filters) {
            conditions.push(`${filter.column} = ?`);
            values.push(filter.value);
        }


        if (conditions.length > 0) {
            query += ` WHERE ${conditions.join(" AND ")}`;
        }

        if (orderBy) {
            query += ` ORDER BY ${orderBy.column} ${orderBy.direction}`;
        }

        if (pagination) {
            query += ` LIMIT ? OFFSET ?`;
            values.push(String(pagination.limit));
            values.push(String(pagination.offset));
        }
          

        const [rows] = await this.db.query(query, values);

        return rows as T[];
    }

    async update(id: number, data: Partial<T>): Promise<T | null> {
        const [result] = await this.db.query<ResultSetHeader>(
            `UPDATE ${this.table} SET ? WHERE id = ?`,
            [data, id]
        );

        return await this.findById(id);
    }

    async create(data: Partial<T>): Promise<T | null> {

        const formattedData = this.formatData(data);

        const [result] = await this.db.query<ResultSetHeader>(
            `INSERT INTO ${this.table} SET ?`,
            [formattedData]
        );

        return await this.findById(result.insertId);
    }

    async softDelete(id: number): Promise<boolean> {
        const [result] = await this.db.query<ResultSetHeader>(
            `UPDATE ${this.table} SET deleted_at = NOW() WHERE id = ? AND deleted_at IS NULL`,
            [id]
        );
        return result.affectedRows > 0;
    }

    async hardDelete(id: number): Promise<boolean> {
        const [result] = await this.db.query<ResultSetHeader>(
            `DELETE FROM ${this.table} WHERE id = ?`,
            [id]
        );
        return result.affectedRows > 0;
    }

    async restore(id: number): Promise<boolean> {
        const [result] = await this.db.query<ResultSetHeader>(
            `UPDATE ${this.table} SET deleted_at = NULL WHERE id = ? AND deleted_at IS NOT NULL`,
            [id]
        );
        return result.affectedRows > 0;
    }
}