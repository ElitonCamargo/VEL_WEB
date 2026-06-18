import { UsuariosController } from './usuarios.controller.ts';
import { UsuariosRepository } from './usuarios.repository.ts';
import { UsuariosService } from './usuarios.service.ts';

const repository = new UsuariosRepository();

const service = new UsuariosService(repository);

export const usuariosController = new UsuariosController(service);