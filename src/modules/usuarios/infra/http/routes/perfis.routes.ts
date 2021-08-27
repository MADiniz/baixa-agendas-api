import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";

import PerfilController from "@modules/usuarios/infra/http/controllers/PerfilController";
import ensureAuthenticated from "../../middlewares/ensureAutheticated";

const perfisRoute = Router();
const perfilController = new PerfilController();

perfisRoute.use(ensureAuthenticated);

perfisRoute.put(
    "/",
    celebrate({
        [Segments.BODY]: {
            nome: Joi.string(),
            email: Joi.string().email(),
            old_password: Joi.string(),
            idFilial: Joi.string(),
            password: Joi.when("old_password", {
                is: Joi.exist(),
                then: Joi.required(),
            }),
            password_confirmation: Joi.when("password", {
                is: Joi.exist(),
                then: Joi.valid(Joi.ref("password")).required(),
            }),
        },
    }),
    perfilController.update,
);
perfisRoute.get("/", perfilController.read);

export default perfisRoute;
