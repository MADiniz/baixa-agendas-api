/* eslint-disable prettier/prettier */
import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import IFiliaisRepository from "../repositories/IFiliaisRepository";

@injectable()
export default class DeleteFilialService {
    constructor(
        @inject("FiliaisRepository")
        private filiaisRepository: IFiliaisRepository,
    ) { }

    public async execute(filial_id: string): Promise<void> {
        const filial = await this.filiaisRepository.findById(filial_id);

        if (!filial) {
            throw new AppError("Filial não encontrada");
        }

        return this.filiaisRepository.delete(filial_id);
    }
}
