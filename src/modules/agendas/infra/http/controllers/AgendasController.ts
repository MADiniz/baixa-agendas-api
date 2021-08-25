import { Request, Response } from "express";
import { container } from "tsyringe";
import ListaAgendasService from "@modules/agendas/services/ListaAgendasService";
import AtualizaAgendaService from "@modules/agendas/services/AtualizaAgendaService";
import CreateAgendaService from "@modules/agendas/services/CreateAgendaService";
import CreateFilialService from "@modules/filiais/services/CreateFilialService";
import IAgenda from "@modules/agendas/dtos/IAgenda";
import ListaFilialService from "@modules/filiais/services/ListaFilialService";

export default class AgendasController {
    public async read(request: Request, response: Response): Promise<Response> {
        const listaAgendaService = container.resolve(ListaAgendasService);

        const { status } = request.query;
        const user_id = request.user.id;

        const agendas = await listaAgendaService.execute(
            status as string,
            user_id,
        );

        const agendasParaExibir: IAgenda[] = [];

        if (agendas) {
            agendas.forEach(agenda => {
                const novaAgenda: IAgenda = {
                    agenda: agenda.nome,
                    // eslint-disable-next-line radix
                    cod_produto: Number.parseInt(agenda.codigoProduto),
                    codigoFilial: agenda.filial.numero,
                    filial: agenda.filial.nome,
                    idsParaUpdate: agenda.idsParaUpdate,
                    qtd_pedida: agenda.quantidadePedida,
                    status: agenda.status,
                    cliente: "",
                    id: agenda.id,
                };

                agendasParaExibir.push(novaAgenda);
            });
        }

        return response.json(agendasParaExibir);
    }

    public async update(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const {
            id,
            agenda,
            cod_produto,
            qtd_pedida,
            filial,
            codigoFilial,
            idsParaUpdate,
            status,
        } = request.body;

        const atualizaAgendaService = container.resolve(AtualizaAgendaService);

        const agendaAtualizada = await atualizaAgendaService.execute({
            id: id || request.params,
            nome: agenda,
            codigoProduto: cod_produto,
            quantidadePedida: qtd_pedida,
            codigoFilial,
            filial,
            idsParaUpdate,
            status,
        });

        return response.json(agendaAtualizada);
    }

    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const createFilialService = container.resolve(CreateFilialService);
        const listaFilialervice = container.resolve(ListaFilialService);

        const createAgendaService = container.resolve(CreateAgendaService);

        const {
            nome,
            codigoProduto,
            quantidadePedida,
            idsParaUpdate,
            status,
            codigoFilial,
            filial,
        } = request.body;

        let filialDaAgenda = await listaFilialervice.execute({
            numero: codigoFilial,
        });

        if (!filialDaAgenda) {
            filialDaAgenda = await createFilialService.execute({
                numero: codigoFilial,
                nome: filial,
            });
        }

        const agenda = await createAgendaService.execute({
            nome,
            codigoProduto,
            quantidadePedida,
            filial_id: filialDaAgenda.id,
            idsParaUpdate,
            status,
        });

        return response.json(agenda);
    }
}
