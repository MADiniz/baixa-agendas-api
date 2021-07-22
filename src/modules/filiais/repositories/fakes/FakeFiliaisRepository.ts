import ICreateFilialDTO from "@modules/filiais/dtos/ICreateFilialDTO";
import Filial from "@modules/filiais/infra/typeorm/entities/Filial";
import IFiliaisRepository from "@modules/filiais/repositories/IFiliaisRepository";
import { uuid } from "uuidv4";

export default class FakeFiliaisRepository implements IFiliaisRepository {
    private filiais: Filial[] = [];

    public async create({ numero }: ICreateFilialDTO): Promise<Filial> {
        const filial = new Filial();
        filial.numero = numero;
        filial.id = uuid();

        await this.filiais.push(filial);
        return filial;
    }

    public async findById(id: string): Promise<Filial | undefined> {
        const findFilial = this.filiais.find(filial => filial.id === id);
        return findFilial;
    }

    public async findByNumero(numero: string): Promise<Filial | undefined> {
        const findFilial = this.filiais.find(
            filial => filial.numero === numero,
        );
        return findFilial;
    }
}
