import type { RouteConfig } from "../../core/types/route.type.ts";
import { usuariosController } from "./usuarios.module.ts";

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