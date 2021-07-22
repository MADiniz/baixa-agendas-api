import { Router } from "express";
import ensureAuthenticated from "@modules/usuarios/infra/middlewares/ensureAutheticated";
import AgendasController from "@modules/agendas/infra/http/controllers/AgendasController";

const agendasRouter = Router();
const agendasController = new AgendasController();

agendasRouter.use(ensureAuthenticated);

agendasRouter.get("/search", agendasController.read);
agendasRouter.put("/:id", agendasController.update);
agendasRouter.post("/", agendasController.create);

export default agendasRouter;
