import { RequestHandler } from "express";

export interface RouteConfig {
  codigo: string;
  metodo: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  rota: string;
  middlewares?: RequestHandler[];
  functionExec: RequestHandler;
  recurso: string;
  descricao: string;
  ehPublica: boolean;
}