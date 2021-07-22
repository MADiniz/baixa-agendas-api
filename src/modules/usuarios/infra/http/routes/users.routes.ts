import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";

import UsersController from "@modules/usuarios/infra/http/controllers/UsersController";

const usersController = new UsersController();

const usuariosRoute = Router();

usuariosRoute.post(
    "/",
    celebrate({
        [Segments.BODY]: {
            nome: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required(),
            numeroFilial: Joi.string().required(),
        },
    }),
    usersController.create,
);

usuariosRoute.get("/", usersController.read);

export default usuariosRoute;
