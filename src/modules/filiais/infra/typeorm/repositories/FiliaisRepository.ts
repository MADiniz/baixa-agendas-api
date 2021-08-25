import ICreateFilialDTO from "@modules/filiais/dtos/ICreateFilialDTO";
import IFiliaisRepository from "@modules/filiais/repositories/IFiliaisRepository";
import { getRepository, Repository } from "typeorm";
import Filial from "../entities/Filial";

class FiliaisRepository implements IFiliaisRepository {
    private ormRepository: Repository<Filial>;

    constructor() {
        this.ormRepository = getRepository(Filial);
    }

    public async findAll(): Promise<Filial[]> {
        return this.ormRepository.find();
    }

    public async findById(id: string): Promise<Filial | undefined> {
        const filial = await this.ormRepository.findOne(id);

        return filial;
    }

    public async create({ nome, numero }: ICreateFilialDTO): Promise<Filial> {
        const filial = this.ormRepository.create({
            numero,
            nome,
        });

        await this.ormRepository.save(filial);
        return filial;
    }

    public async findByNumero(numero: string): Promise<Filial | undefined> {
        const findFilialBySameNumber = await this.ormRepository.findOne({
            where: { numero },
        });

        return findFilialBySameNumber;
    }

    public async save(filial: Filial): Promise<Filial> {
        await this.ormRepository.save(filial);

        return filial;
    }

    public async delete(id: string): Promise<void> {
        await this.ormRepository.delete(id);
    }
}

export default FiliaisRepository;
