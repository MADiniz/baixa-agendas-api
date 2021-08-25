import { CronJob } from "cron";
import { container } from "tsyringe";
import ListaAgendasExternasService from "@modules/agendas/services/ListaAgendasExternasService";
import AtualizaAgendasExternasService from "@modules/agendas/services/AtualizaAgendasExternasService";
import CreateAgendaService from "@modules/agendas/services/CreateAgendaService";
import CreateFilialService from "@modules/filiais/services/CreateFilialService";
import externalApi from "@config/externalApi";
import AppLog from "@shared/logs/AppLog";
import ListaFilialService from "@modules/filiais/services/ListaFilialService";
import IAgendadorDeTarefas from "./IAgendadorDeTarefas";

export default class AgendadorDeTarefas implements IAgendadorDeTarefas {
    public agendaTarefa(): void {
        const STATUS_PARA_PROCESSAMENTO = 0;

        const CONFIG_TIMER_JOB =
            process.env.TIMER_JOB_AGENDA_EXTERNA || "0 */10 * * * *";

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

        const job = new CronJob(CONFIG_TIMER_JOB, async () => {
            try {
                const listaAgendaExternasService = container.resolve(
                    ListaAgendasExternasService,
                );

                const atualizaAgendasExternasService = container.resolve(
                    AtualizaAgendasExternasService,
                );

                const agendasExternas = await listaAgendaExternasService.execute(
                    {
                        config: configListaAgendasRequest,
                    },
                );

                // eslint-disable-next-line no-restricted-syntax
                for (const agendaExterna of agendasExternas) {
                    const listaFilialService = container.resolve(
                        ListaFilialService,
                    );

                    const createFilialService = container.resolve(
                        CreateFilialService,
                    );

                    const createAgendaService = container.resolve(
                        CreateAgendaService,
                    );

                    // eslint-disable-next-line no-await-in-loop
                    let filial = await listaFilialService.execute({
                        numero: agendaExterna.codigoFilial,
                    });

                    if (!filial) {
                        // eslint-disable-next-line no-await-in-loop
                        filial = await createFilialService.execute({
                            numero: agendaExterna.codigoFilial,
                            nome: agendaExterna.filial,
                        });
                    }

                    // eslint-disable-next-line no-await-in-loop
                    await createAgendaService.execute({
                        nome: agendaExterna.agenda,
                        codigoProduto: agendaExterna.cod_produto.toString(),
                        idsParaUpdate: agendaExterna.idsParaUpdate,
                        quantidadePedida: agendaExterna.qtd_pedida,
                        status: STATUS_PARA_PROCESSAMENTO,
                        filial_id: filial.id,
                    });

                    // eslint-disable-next-line no-await-in-loop
                    await atualizaAgendasExternasService.execute({
                        config: configAtualizaAgendasRequest,
                        agendas: [agendaExterna],
                    });
                }
            } catch (error) {
                const date = new Date();
                const log: AppLog = new AppLog(
                    date,
                    `Erro durante a execução da tarefa agendada: ${error.name}`,
                );
            }
        });

        job.start();
    }
}
