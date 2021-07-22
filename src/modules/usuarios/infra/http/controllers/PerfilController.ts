import { classToClass } from "class-transformer";
import { Request, Response } from "express";
import { container } from "tsyringe";
import ListaPerfilService from "@modules/usuarios/services/ListaPerfilService";
import UpdatePerfilService from "@modules/usuarios/services/UpdatePerfilService";

export default class PerfilController {
    public async update(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const user_id = request.user.id;
        const {
            nome,
            email,
            old_password,
            password,
            numeroFilial,
        } = request.body;

        const updatePerfilService = container.resolve(UpdatePerfilService);

        const user = await updatePerfilService.execute({
            user_id,
            email,
            nome,
            old_password,
            password,
            numeroFilial,
        });

        return response.json(user);
    }

    public async read(request: Request, response: Response): Promise<Response> {
        const user_id = request.user.id;

        const listaPerfilService = container.resolve(ListaPerfilService);

        const user = await listaPerfilService.execute({ user_id });

        return response.json(classToClass(user));
    }
}
