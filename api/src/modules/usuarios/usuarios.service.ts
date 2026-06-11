import { UsuariosRepository } from "./usuarios.repository.ts";
import type { Usuario } from "./usuarios.types.ts";
import bcrypt from "bcrypt";

export class UsuariosService {
  protected repository: UsuariosRepository;
  constructor() {
    this.repository = new UsuariosRepository();
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

  async fildAll(): Promise<Usuario[]> {
    return this.repository.findAll();
  }
}
