/* eslint-disable prettier/prettier */
import AppError from "@shared/errors/AppError";
import { injectable, inject } from "tsyringe";
import Agenda from "../infra/typeorm/entities/Agenda";
import IAgendasRepository from "../repositories/IAgendasRepository";

interface IRequest {
    id: string;
    nome: string;
    codigoProduto: string;
    quantidadePedida: number;
    codigoFilial?: string;
    filial?: string;
    idsParaUpdate: string;
    status: number;
}

@injectable()
export default class AtualizaAgendaService {
    constructor(
        @inject("AgendasRepository")
        private agendasRepository: IAgendasRepository,
    ) { }

    public async execute({
        id,
        nome,
        codigoProduto,
        codigoFilial,
        filial,
        idsParaUpdate,
        quantidadePedida,
        status
    }: IRequest): Promise<Agenda> {

        if (!id) {
            throw new AppError("Id não informado");
        }

        const agenda = await this.agendasRepository.findById(id);


        if (!agenda) {
            throw new AppError("Agenda não encontrada");
        }

        agenda.nome = nome;
        agenda.codigoProduto = codigoProduto;
        agenda.idsParaUpdate = idsParaUpdate;
        agenda.quantidadePedida = quantidadePedida;
        agenda.status = status;


        await this.agendasRepository.save(agenda);

        return agenda;
    }
}
