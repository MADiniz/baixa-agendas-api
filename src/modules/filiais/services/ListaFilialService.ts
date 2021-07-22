/* eslint-disable prettier/prettier */
import { inject, injectable } from "tsyringe";
import ICreateFilialDTO from "../dtos/ICreateFilialDTO";
import Filial from "../infra/typeorm/entities/Filial";
import IFiliaisRepository from "../repositories/IFiliaisRepository";

interface IRequest {
    id?: string;
    numero?: string;
}

@injectable()
class ListaFilialService {
    constructor(
        @inject("FiliaisRepository")
        private filiaisRepository: IFiliaisRepository,
    ) { }

    public async execute({ id, numero }: IRequest): Promise<Filial | undefined> {

        let filial: Filial | undefined;

        if (numero) {
            filial = await this.filiaisRepository.findByNumero(
                numero,
            );
        }

        if (id) {
            filial = await this.filiaisRepository.findById(
                id,
            );
        }

        return filial;
    }
}

export default ListaFilialService;
