import { Router } from "express";
import routesUsuarios from "../modules/usuarios/usuarios.route.ts";
import type{ RouteConfig } from "./route.type.ts";

const allRoutes: RouteConfig[] = [
  ...routesUsuarios,

];


const router: Router = Router();


router.get("/", (req, res) => {
  res.send("🚗 API de Veículos com TS!");
});

type RouterMethod = "get" | "post" | "put" | "patch" | "delete";

allRoutes.forEach((route) => {
  const method = route.metodo.toLowerCase() as RouterMethod;

	const middlewares = route.middlewares? route.middlewares : [];
	const path = route.rota;
	router[method](path,...middlewares, route.functionExec as any);
});

export default router;
