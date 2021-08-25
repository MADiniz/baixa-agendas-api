import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";

import FiliaisController from "@modules/filiais/infra/http/controllers/FiliaisController";
import ensureAuthenticated from "@modules/usuarios/infra/middlewares/ensureAutheticated";

const filiaisRoute = Router();
const filiaisController = new FiliaisController();

filiaisRoute.use(ensureAuthenticated);

filiaisRoute.get("/", filiaisController.read);
filiaisRoute.post(
    "/",
    celebrate({
        [Segments.BODY]: {
            nome: Joi.string(),
            numero: Joi.string().required(),
        },
    }),
    filiaisController.create,
);
filiaisRoute.put(
    "/:id",
    celebrate({
        [Segments.BODY]: {
            nome: Joi.string().required(),
            numero: Joi.string().required(),
        },
    }),
    filiaisController.update,
);
filiaisRoute.delete("/:id", filiaisController.delete);

export default filiaisRoute;
