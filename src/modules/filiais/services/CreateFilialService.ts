/* eslint-disable prettier/prettier */
import AppError from "@shared/errors/AppError";
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

    public async execute({ nome, numero }: ICreateFilialDTO): Promise<Filial> {
        const findFilialBySameNumero = await this.filiaisRepository.findByNumero(
            numero,
        );

        if (findFilialBySameNumero) {
            throw new AppError('Filial já existente');
        }

        const filial = await this.filiaisRepository.create({
            numero,
            nome
        });

        return filial;
    }
}

export default CreateFilialService;
