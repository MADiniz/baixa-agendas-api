/* eslint-disable prettier/prettier */
import { injectable, inject } from "tsyringe";
import IAgendadorDeTarefas from "../entities/IAgendadorDeTarefas";

interface IRequest {
    tempo: number;
    padrao: string;
}

@injectable()
export default class BuscadorDeAgendasService {
    constructor(
        @inject("AgendadorDeTarefas")
        private agendadorDeTarefas: IAgendadorDeTarefas,
    ) { }

    public async execute({ tempo, padrao }: IRequest): Promise<void> {
        await this.agendadorDeTarefas.agendaTarefa({
            padrao,
            valor: tempo,
        });
    }
}
