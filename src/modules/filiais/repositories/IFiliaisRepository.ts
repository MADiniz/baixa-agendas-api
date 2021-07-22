import ICreateFilialDTO from "../dtos/ICreateFilialDTO";
import Filial from "../infra/typeorm/entities/Filial";

export default interface IFiliaisRepository {
    create(data: ICreateFilialDTO): Promise<Filial>;
    findByNumero(numero: string): Promise<Filial | undefined>;
    findById(id: string): Promise<Filial | undefined>;
}
