import Agenda from "@modules/agendas/infra/typeorm/entities/Agenda";
import ICreateAgendaDTO from "../dtos/ICreateAgendaDTO";
import IAgendaPorStatus from "../dtos/IAgendaPorStatus";

export default interface IAgendasRepository {
    findByStatusEFilial(data: IAgendaPorStatus): Promise<Agenda[] | undefined>;
    findByStatus(status: number): Promise<Agenda[] | undefined>;
    findById(id: string): Promise<Agenda | undefined>;
    create(data: ICreateAgendaDTO): Promise<Agenda>;
    findAll(): Promise<Agenda[]>;
    save(data: Agenda): Promise<Agenda>;
}
