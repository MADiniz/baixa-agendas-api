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

    public execute({ tempo, padrao }: IRequest): void {
        this.agendadorDeTarefas.agendaTarefa({
            padrao,
            valor: tempo,
        });
    }
}
