import type { Pool, ResultSetHeader } from "mysql2/promise";
import pool from "./connection.ts";


export abstract class BaseRepository<T> {
    protected table: string;
    protected db: Pool;
    protected softDeleteEnabled: boolean = true;

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

    constructor(table: string, softDeleteEnabled: boolean = true) {
        this.table = table;
        this.db = pool;
        this.softDeleteEnabled = softDeleteEnabled;
    }

    async findById(id: number): Promise<T | null> {
        const [rows] = await this.db.query(
            `SELECT * FROM ${this.table} WHERE id = ? ${this.softDeleteEnabled ? "AND deleted_at IS NULL" : ""} LIMIT 1`,
            [id]
        );

        const result = rows as T[];
        return result.length ? result[0] : null;
    }

    async findAll(limit?: number, offset?: number): Promise<T[]> {
        let query = `SELECT * FROM ${this.table}`;
        const conditions: string[] = [];
        const values: string[] = [];

        if (this.softDeleteEnabled) {
            conditions.unshift("deleted_at IS NULL");
        }

        if (limit !== undefined) {
            conditions.push(`LIMIT ?`);
            values.push(limit.toString());
        }

        if (offset !== undefined) {
            conditions.push(`OFFSET ?`);
            values.push(offset.toString());
        }

        if (conditions.length > 0) {
            query += ` WHERE ${conditions.join(" AND ")}`;
        }

        const [rows] = await this.db.query(query, values);

        return rows as T[];
    }

    async findAllWithFilters(filters: Record<string, unknown>,limit?: number,offset?: number): Promise<T[]> {

        const conditions: string[] = [];
        const values: unknown[] = [];

        if (this.softDeleteEnabled) {
            conditions.push("deleted_at IS NULL");
        }

        for (const [key, value] of Object.entries(filters)) {
            conditions.push(`${key} = ?`);
            values.push(value);
        }

        let query = `SELECT * FROM ${this.table}`;

        if (conditions.length > 0) {
            query += ` WHERE ${conditions.join(" AND ")}`;
        }

        if (limit !== undefined) {
            query += ` LIMIT ?`;
            values.push(limit);
        }

        if (offset !== undefined) {
            query += ` OFFSET ?`;
            values.push(offset);
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