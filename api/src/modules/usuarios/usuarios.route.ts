import type { RouteConfig } from "../../routes/route.type.ts";
import { UsuariosController } from "./usuarios.controller.ts";
const usuariosController = new UsuariosController();

const routesUsuarios: RouteConfig[] = [
  {
    codigo: 'usuarios:create',
    metodo: 'POST',
    rota: '/usuarios',
    // middlewares: [],
    functionExec: usuariosController.create,
    recurso: 'Usuários',
    descricao: 'Criar novo usuário',
    ehPublica: false
  },
  {
    codigo: 'usuarios:list',
    metodo: 'GET',
    rota: '/usuarios',
    // middlewares: [],
    functionExec: usuariosController.findAll,
    recurso: 'Usuários',
    descricao: 'Listar todos os usuários',
    ehPublica: false
  }
];

export default routesUsuarios;