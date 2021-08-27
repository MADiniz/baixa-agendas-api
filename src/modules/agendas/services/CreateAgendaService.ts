/* eslint-disable prettier/prettier */
import { injectable, inject } from "tsyringe";
import Agenda from "../infra/typeorm/entities/Agenda";
import IAgendasRepository from "../repositories/IAgendasRepository";

interface IRequest {
    nome: string;
    codigoProduto: string;
    quantidadePedida: number;
    filial_id: string;
    idsParaUpdate: string;
    status: number;
    cliente: string;
}

@injectable()
export default class CreateAgendaService {
    constructor(
        @inject("AgendasRepository")
        private agendasRepository: IAgendasRepository,
    ) { }

    public async execute({
        nome,
        codigoProduto,
        filial_id,
        idsParaUpdate,
        quantidadePedida,
        status,
        cliente,
    }: IRequest): Promise<Agenda> {

        const novaAgenda = await this.agendasRepository.create({
            nome,
            codigoProduto,
            filial_id,
            idsParaUpdate,
            quantidadePedida,
            status,
            cliente
        });

        return novaAgenda;
    }
}
