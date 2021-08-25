import { uuid } from "uuidv4";
import ICreateAgendaDTO from "@modules/agendas/dtos/ICreateAgendaDTO";
import IAgendasRepository from "@modules/agendas/repositories/IAgendasRepository";
import Agenda from "@modules/agendas/infra/typeorm/entities/Agenda";
import IAgendaPorStatus from "@modules/agendas/dtos/IAgendaPorStatus";

export default class FakeAgendasRepository implements IAgendasRepository {
    private agendas: Agenda[] = [];

    public async save(agenda: Agenda): Promise<Agenda> {
        this.agendas.push(agenda);
        return agenda;
    }

    public async findAll(): Promise<Agenda[]> {
        return this.agendas;
    }

    public async findById(id: string): Promise<Agenda | undefined> {
        const findAgenda = this.agendas.find(agenda => agenda.id === id);
        return findAgenda;
    }

    public async findByStatus(status: number): Promise<Agenda[] | undefined> {
        const findAgenda = this.agendas.filter(
            agenda => agenda.status === status,
        );
        return findAgenda;
    }

    public async findByStatusEFilial({
        status,
        filial_id,
    }: IAgendaPorStatus): Promise<Agenda[] | undefined> {
        const findAgendaPorStatusEFilial = this.agendas.filter(
            agenda =>
                agenda.status === status && agenda.filial_id === filial_id,
        );
        return findAgendaPorStatusEFilial;
    }

    public async create({
        nome,
        codigoProduto,
        filial_id,
        idsParaUpdate,
        quantidadePedida,
        status,
    }: ICreateAgendaDTO): Promise<Agenda> {
        const novaAgenda = new Agenda();

        Object.assign(novaAgenda, {
            id: uuid(),
            nome,
            codigoProduto,
            filial_id,
            idsParaUpdate,
            quantidadePedida,
            status,
        });

        await this.agendas.push(novaAgenda);

        return novaAgenda;
    }
}
