import { CrudService } from "../../core/services/abstract-crud.service.ts";
import { UsuariosRepository } from "./usuarios.repository.ts";
import type { Usuario } from "./usuario.entity.ts";
import bcrypt from "bcrypt";

export class UsuariosService extends CrudService<Usuario, UsuariosRepository> {
  constructor(usuariosRepository: UsuariosRepository) {
    super(usuariosRepository);
  }

  async create(data:Partial<Usuario>): Promise<Usuario | null> {
    const existente = await this.repository.findByEmail(data.email!);

    if (existente) {
      throw new Error("Usuário já existe");
    }

    const senhaHash = await bcrypt.hash(data.senha!, 10);

    delete data.senha;

    return this.repository.create({
      ...data,
      senha: senhaHash
    });
  }

  async findAll(): Promise<Usuario[]> {
    return this.repository.findAll();
  }
}
