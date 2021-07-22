import { Router } from "express";
import usuariosRoute from "@modules/usuarios/infra/http/routes/users.routes";
import sessionsRouter from "@modules/usuarios/infra/http/routes/sessions.routes";
import agendasRouter from "@modules/agendas/infra/http/routes/agendas.routes";
import perfisRoute from "@modules/usuarios/infra/http/routes/perfis.routes";

const routes = Router();

routes.use("/usuarios", usuariosRoute);

routes.use("/agendas", agendasRouter);
routes.use("/sessions", sessionsRouter);
routes.use("/perfil", perfisRoute);

export default routes;
