import IAgendadorDeTarefas from "../IAgendadorDeTarefas";

export default class FakeAgendadorDeTarefas implements IAgendadorDeTarefas {
    public agendaTarefa(): void {
        console.log("Agendou a Tarefa");
    }
}
