import AtualizaFilialService from "@modules/filiais/services/AtualizaFilialService";
import CreateFilialService from "@modules/filiais/services/CreateFilialService";
import DeleteFilialService from "@modules/filiais/services/DeleteFilialService";
import ListAllFiliaisService from "@modules/filiais/services/ListAllFiliaisService";
import { classToClass } from "class-transformer";
import { Request, Response } from "express";
import { container } from "tsyringe";

export default class FiliaisController {
    public async read(request: Request, response: Response): Promise<Response> {
        const listAllFiliaisService = container.resolve(ListAllFiliaisService);

        const filiais = await listAllFiliaisService.execute();

        return response.json(classToClass(filiais));
    }

    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const createFilialService = container.resolve(CreateFilialService);

        const { nome, numero } = request.body;

        const filial = await createFilialService.execute({ nome, numero });

        return response.json(classToClass(filial));
    }

    public async update(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const atualizaFilialService = container.resolve(AtualizaFilialService);

        const { filial_id } = request.params;
        const { nome, numero } = request.body;

        const filial = await atualizaFilialService.execute({
            filial_id,
            nome,
            numero,
        });
        return response.json(classToClass(filial));
    }

    public async delete(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { id } = request.params;

        const deleteFilialService = container.resolve(DeleteFilialService);

        await deleteFilialService.execute(id);

        return response
            .status(200)
            .json({ mensagem: "Processo efetuado com sucesso!" });
    }
}
