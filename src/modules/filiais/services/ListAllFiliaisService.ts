/* eslint-disable prettier/prettier */
import { inject, injectable } from "tsyringe";
import Filial from "../infra/typeorm/entities/Filial";
import IFiliaisRepository from "../repositories/IFiliaisRepository";

@injectable()
class ListAllFiliaisService {
    constructor(
        @inject("FiliaisRepository")
        private filiaisRepository: IFiliaisRepository,
    ) { }

    public async execute(): Promise<Filial[]> {
        return this.filiaisRepository.findAll();
    }
}

export default ListAllFiliaisService;
