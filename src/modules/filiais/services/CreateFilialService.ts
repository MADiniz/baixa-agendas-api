/* eslint-disable prettier/prettier */
import { inject, injectable } from "tsyringe";
import ICreateFilialDTO from "../dtos/ICreateFilialDTO";
import Filial from "../infra/typeorm/entities/Filial";
import IFiliaisRepository from "../repositories/IFiliaisRepository";

@injectable()
class CreateFilialService {
    constructor(
        @inject("FiliaisRepository")
        private filiaisRepository: IFiliaisRepository,
    ) { }

    public async execute({ numero }: ICreateFilialDTO): Promise<Filial> {
        const findFilialBySameNumero = await this.filiaisRepository.findByNumero(
            numero,
        );

        if (findFilialBySameNumero) {
            return findFilialBySameNumero;
        }

        const filial = await this.filiaisRepository.create({
            numero,
        });

        return filial;
    }
}

export default CreateFilialService;
