/* eslint-disable prettier/prettier */
import { injectable, inject } from "tsyringe";
import IFiliaisRepository from "@modules/filiais/repositories/IFiliaisRepository";
import IUsuariosRepository from "@modules/usuarios/repositories/IUsuariosRepository";
import AppError from "@shared/errors/AppError";
import IAgendasRepository from "../repositories/IAgendasRepository";
import Agenda from "../infra/typeorm/entities/Agenda";
import TIPOAGENDA from "../utils/tipoAgenda";

interface IRequest {
    codigo?: string,
    user_id: string
}

@injectable()
class ListaAgendasService {

    constructor(
        @inject("AgendasRepository")
        private agendasRepository: IAgendasRepository,
        @inject("FiliaisRepository")
        private filiaisRepository: IFiliaisRepository,
        @inject("UsuariosRepository")
        private usuariosRepository: IUsuariosRepository
    ) { }

    public async execute({ codigo = 'any', user_id }: IRequest): Promise<Agenda[] | undefined> {

        const user = await this.usuariosRepository.findById(user_id);

        if (!user) {
            throw new AppError("Usuario não encontrado")
        }

        // PPR código para processamento.
        // Ideia é usar um enum
        const agendas: Agenda[] = [];

        if (codigo === TIPOAGENDA.Processar) {

            const agendasParaProcessar = await this.agendasRepository.findByStatus(0);

            if (agendasParaProcessar) {
                agendasParaProcessar.forEach(agenda => agendas.push(agenda))
            }

        } else if (codigo === TIPOAGENDA.Erro) {

            const findAgendasErrorSistema = await this.agendasRepository.findByStatusEFilial({ status: 3, filial_id: user.filial_id });

            const findAgendasErrorNegocios = await this.agendasRepository.findByStatusEFilial({ status: 4, filial_id: user.filial_id });

            if (findAgendasErrorSistema) {
                findAgendasErrorSistema.forEach(agenda => agendas.push(agenda))
            }

            if (findAgendasErrorNegocios) {
                findAgendasErrorNegocios.forEach(agenda => agendas.push(agenda))
            }

        } else {
            const findAllAgendas = await this.agendasRepository.findAll();
            findAllAgendas.map(agenda => agendas.push(agenda));
        }

        // eslint-disable-next-line no-restricted-syntax
        for (const agenda of agendas) {
            // eslint-disable-next-line no-await-in-loop
            const filial = await this.filiaisRepository.findById(agenda.filial_id);
            if (filial) {
                agenda.filial = filial;
            }
        }


        return agendas;

    }
}

export default ListaAgendasService;
