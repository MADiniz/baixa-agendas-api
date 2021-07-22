import { Request, Response, NextFunction } from "express";
import { container } from "tsyringe";
import externalApi from "@config/externalApi";
import ListaAgendasExternasService from "@modules/agendas/services/ListaAgendasExternasService";
import AtualizaAgendasExternasService from "@modules/agendas/services/AtualizaAgendasExternasService";
import CreateAgendaService from "@modules/agendas/services/CreateAgendaService";
import CreateFilialService from "@modules/filiais/services/CreateFilialService";
import AppError from "@shared/errors/AppError";
import TIPOAGENDA from "@modules/agendas/utils/tipoAgenda";

export default async function appIntegration(
    request: Request,
    response: Response,
    next: NextFunction,
): Promise<void> {
    const { status } = request.query;

    const STATUS_PARA_PROCESSAMENTO = 0;

    if (status === TIPOAGENDA.Processar) {
        const configListaAgendasRequest = {
            url: `${externalApi.listaAgendas.url}/${externalApi.listaAgendas.resource}`,
            auth: {
                username: externalApi.listaAgendas.user as string,
                password: externalApi.listaAgendas.pass as string,
            },
        };

        const configAtualizaAgendasRequest = {
            url: `${externalApi.reprocessaAgendas.url}/${externalApi.reprocessaAgendas.resource}`,
            auth: {
                username: externalApi.reprocessaAgendas.user as string,
                password: externalApi.reprocessaAgendas.pass as string,
            },
        };

        const listaAgendaExternasService = container.resolve(
            ListaAgendasExternasService,
        );

        const atualizaAgendasExternasService = container.resolve(
            AtualizaAgendasExternasService,
        );

        try {
            const createFilialService = container.resolve(CreateFilialService);

            const createAgendaService = container.resolve(CreateAgendaService);

            const agendasExternas = await listaAgendaExternasService.execute({
                config: configListaAgendasRequest,
            });

            // eslint-disable-next-line no-restricted-syntax
            for (const agendaExterna of agendasExternas) {
                // eslint-disable-next-line no-await-in-loop
                const filial = await createFilialService.execute({
                    numero: agendaExterna.codigoFilial,
                    nome: agendaExterna.filial,
                });

                // eslint-disable-next-line no-await-in-loop
                await createAgendaService.execute({
                    nome: agendaExterna.agenda,
                    codigoProduto: agendaExterna.cod_produto.toString(),
                    idsParaUpdate: agendaExterna.idsParaUpdate,
                    quantidadePedida: agendaExterna.qtd_pedida,
                    status: STATUS_PARA_PROCESSAMENTO,
                    filial_id: filial.id,
                });
            }

            await atualizaAgendasExternasService.execute({
                config: configAtualizaAgendasRequest,
                agendas: agendasExternas,
            });
        } catch (error) {
            throw new AppError("Intagration with app failure");
        }
    }
    return next();
}
