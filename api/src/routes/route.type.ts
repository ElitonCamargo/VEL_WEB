export interface RouteConfig {
  codigo: string;
  metodo: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  rota: string;
  middlewares?: [];
  functionExec: (...args: any[]) => any;
  recurso: string;
  descricao: string;
  ehPublica: boolean;
}