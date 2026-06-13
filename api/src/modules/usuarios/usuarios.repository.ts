import { CrudRepository } from "../../core/repository/abstract-crud.repository.ts";
import type { Usuario } from "./usuarios.types.ts";

export class UsuariosRepository extends CrudRepository<Usuario> {
  constructor() {
    super("usuarios");
  }

  async findByEmail(email: string): Promise<Usuario | null> {
    const [rows] = await this.db.query(
      `SELECT * FROM usuarios WHERE email = ? AND deleted_at IS NULL LIMIT 1`,
      [email]
    );

    const result = rows as Usuario[];
    return result.length ? result[0] : null;
  }
}