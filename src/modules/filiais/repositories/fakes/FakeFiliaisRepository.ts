import ICreateFilialDTO from "@modules/filiais/dtos/ICreateFilialDTO";
import Filial from "@modules/filiais/infra/typeorm/entities/Filial";
import IFiliaisRepository from "@modules/filiais/repositories/IFiliaisRepository";
import { uuid } from "uuidv4";

export default class FakeFiliaisRepository implements IFiliaisRepository {
    private filiais: Filial[] = [];

    public async create({
        numero,
        nome = "",
    }: ICreateFilialDTO): Promise<Filial> {
        const filial = new Filial();
        filial.numero = numero;
        filial.nome = nome;
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

    public async findAll(): Promise<Filial[]> {
        return this.filiais;
    }

    public async save(filial: Filial): Promise<Filial> {
        const findIndex = this.filiais.findIndex(
            findFilial => findFilial.id === filial.id,
        );

        this.filiais[findIndex] = filial;

        return filial;
    }

    public async delete(id: string): Promise<void> {
        const findIndex = this.filiais.findIndex(filial => filial.id === id);
        this.filiais.splice(findIndex, 1);
    }
}
