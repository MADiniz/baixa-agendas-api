/* eslint-disable prettier/prettier */
import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import Filial from "../infra/typeorm/entities/Filial";
import IFiliaisRepository from "../repositories/IFiliaisRepository";

interface IRequest {
    filial_id: string;
    nome: string;
    numero: string;
}

@injectable()
export default class AtualizaFilialService {
    constructor(
        @inject("FiliaisRepository")
        private filiaisRepository: IFiliaisRepository,
    ) { }

    public async execute({
        filial_id,
        nome,
        numero,
    }: IRequest): Promise<Filial> {
        const filial = await this.filiaisRepository.findById(filial_id);

        if (!filial) {
            throw new AppError("Filial não encontrada.");
        }

        filial.nome = nome;
        filial.numero = numero;

        return this.filiaisRepository.save(filial);
    }
}
