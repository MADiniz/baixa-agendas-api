/* eslint-disable prettier/prettier */
import { injectable, inject } from "tsyringe";
import IAgendadorDeTarefas from "../entities/IAgendadorDeTarefas";

@injectable()
export default class BuscadorDeAgendasService {
    constructor(
        @inject("AgendadorDeTarefas")
        private agendadorDeTarefas: IAgendadorDeTarefas,
    ) { }

    public execute(): void {
        this.agendadorDeTarefas.agendaTarefa();
    }
}
