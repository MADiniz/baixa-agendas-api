import IJob from "../dtos/IJob";

export default interface IAgendadorDeTarefas {
    agendaTarefa(data: IJob): void;
}
