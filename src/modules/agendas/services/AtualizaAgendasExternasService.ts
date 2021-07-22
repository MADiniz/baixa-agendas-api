/* eslint-disable prettier/prettier */
import { injectable, inject } from "tsyringe";
import ICreateRequestDTO from "@shared/container/providers/ApiRequestProvider/dtos/ICreateRequestDTO";
import IApiRequestProvider from "@shared/container/providers/ApiRequestProvider/models/IApiRequestProvider";
import IAgenda from "../dtos/IAgenda";


interface IRequest {
    config: ICreateRequestDTO;
    agendas: IAgenda[];
}


@injectable()
class AtualizaAgendasExternasService {
    constructor(
        @inject('ApiRequestProvider')
        private apiRequestProvider: IApiRequestProvider
    ) { }

    public async execute({ config, agendas }: IRequest): Promise<any> {


        const STATUS_REPROCESSAMENTO = 2;

        // eslint-disable-next-line array-callback-return
        agendas.map(agenda => {
            // eslint-disable-next-line no-param-reassign
            agenda.status = STATUS_REPROCESSAMENTO;
        })

        const response = await this.apiRequestProvider.post({
            url: config.url,
            body: agendas,
            auth: config.auth
        });

        return response;
    }
}

export default AtualizaAgendasExternasService;
