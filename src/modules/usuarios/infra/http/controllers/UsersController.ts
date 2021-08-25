import { classToClass } from "class-transformer";
import { Request, Response } from "express";
import { container } from "tsyringe";
import CreateUsuarioService from "@modules/usuarios/services/CreateUsuarioService";
import ListaUsuariosService from "@modules/usuarios/services/ListaUsuariosService";
import DeleteUsuarioService from "@modules/usuarios/services/DeleteUsuarioService";

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
        const { nome, email, password, idFilial } = request.body;

        const createUsuarioService = container.resolve(CreateUsuarioService);

        const usuario: IUsuario = await createUsuarioService.execute({
            nome,
            email,
            password,
            filial_id: idFilial,
        });

        return response.json(classToClass(usuario));
    }

    public async read(request: Request, response: Response): Promise<Response> {
        const listUsuarios = container.resolve(ListaUsuariosService);

        const usuarios = await listUsuarios.execute();

        return response.json(classToClass(usuarios));
    }

    public async delete(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const deleteUsuarioService = container.resolve(DeleteUsuarioService);

        const { id } = request.params;

        await deleteUsuarioService.execute(id);

        return response.json({ mensagem: "Processo efetuado com sucesso!" });
    }
}
