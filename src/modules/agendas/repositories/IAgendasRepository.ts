import Agenda from "@modules/agendas/infra/typeorm/entities/Agenda";
import ICreateAgendaDTO from "../dtos/ICreateAgendaDTO";

export default interface IAgendasRepository {
    findByStatus(
        status: number,
        filial_id: string,
    ): Promise<Agenda[] | undefined>;
    findById(id: string): Promise<Agenda | undefined>;
    create(data: ICreateAgendaDTO): Promise<Agenda>;
    findAll(): Promise<Agenda[]>;
    save(data: Agenda): Promise<Agenda>;
}
