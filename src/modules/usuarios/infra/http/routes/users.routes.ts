import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";

import UsersController from "@modules/usuarios/infra/http/controllers/UsersController";
import ensureAuthenticated from "@modules/usuarios/infra/middlewares/ensureAutheticated";

const usersController = new UsersController();

const usuariosRoute = Router();

usuariosRoute.use(ensureAuthenticated);

usuariosRoute.post(
    "/",
    celebrate({
        [Segments.BODY]: {
            nome: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required(),
            idFilial: Joi.string().required(),
        },
    }),
    usersController.create,
);

usuariosRoute.get("/", usersController.read);
usuariosRoute.delete("/:id", usersController.delete);

export default usuariosRoute;
