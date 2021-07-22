import { classToClass } from "class-transformer";
import { Request, Response } from "express";
import { container } from "tsyringe";
import CreateUsuarioService from "@modules/usuarios/services/CreateUsuarioService";
import CreateFilialService from "@modules/filiais/services/CreateFilialService";
import ListaUsuariosService from "@modules/usuarios/services/ListaUsuariosService";

interface IUsuario {
    nome: string;
    email: string;
    password?: string;
}

export default class UsersController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { nome, email, password, numeroFilial } = request.body;

        const createFilialService = container.resolve(CreateFilialService);

        const filial = await createFilialService.execute({
            numero: numeroFilial,
        });

        const createUsuarioService = container.resolve(CreateUsuarioService);

        const usuario: IUsuario = await createUsuarioService.execute({
            nome,
            email,
            password,
            filial_id: filial.id,
        });

        return response.json(classToClass(usuario));
    }

    public async read(request: Request, response: Response): Promise<Response> {
        const listUsuarios = container.resolve(ListaUsuariosService);

        const usuarios = await listUsuarios.execute();

        return response.json(classToClass(usuarios));
    }
}
