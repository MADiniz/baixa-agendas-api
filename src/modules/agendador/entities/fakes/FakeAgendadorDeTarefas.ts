import IJob from "@modules/agendador/dtos/IJob";
import IAgendadorDeTarefas from "../IAgendadorDeTarefas";

export default class FakeAgendadorDeTarefas implements IAgendadorDeTarefas {
    public agendaTarefa(data: IJob): void {
        console.log("Agendou a Tarefa");
    }
}
