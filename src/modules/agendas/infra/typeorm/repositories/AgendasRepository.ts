import { getRepository, Repository } from "typeorm";
import ICreateAgendaDTO from "@modules/agendas/dtos/ICreateAgendaDTO";
import IAgendasRepository from "@modules/agendas/repositories/IAgendasRepository";
import Agenda from "@modules/agendas/infra/typeorm/entities/Agenda";
import IAgendaPorStatus from "@modules/agendas/dtos/IAgendaPorStatus";

export default class AgendasRepository implements IAgendasRepository {
    private ormRepository: Repository<Agenda>;

    constructor() {
        this.ormRepository = getRepository(Agenda);
    }

    public async findById(id: string): Promise<Agenda | undefined> {
        const findAgenda = await this.ormRepository.findOne(id);

        return findAgenda;
    }

    public async save(agenda: Agenda): Promise<Agenda> {
        return this.ormRepository.save(agenda);
    }

    public async findAll(): Promise<Agenda[]> {
        return this.ormRepository.find();
    }

    public async findByStatus(status: number): Promise<Agenda[] | undefined> {
        const findAgenda = await this.ormRepository.find({
            where: { status },
        });
        return findAgenda;
    }

    public async findByStatusEFilial({
        status,
        filial_id,
    }: IAgendaPorStatus): Promise<Agenda[] | undefined> {
        const findAgendaPorStatusEFilial = await this.ormRepository.find({
            where: { status, filial_id },
        });
        return findAgendaPorStatusEFilial;
    }

    public async create({
        nome,
        codigoProduto,
        filial_id,
        idsParaUpdate,
        quantidadePedida,
        status,
        cliente,
    }: ICreateAgendaDTO): Promise<Agenda> {
        const novaAgenda = this.ormRepository.create({
            nome,
            filial_id,
            codigoProduto,
            idsParaUpdate,
            quantidadePedida,
            status,
            cliente,
        });

        await this.ormRepository.save(novaAgenda);

        return novaAgenda;
    }
}
