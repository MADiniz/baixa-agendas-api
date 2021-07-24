/* eslint-disable prettier/prettier */
import ICreateRequestDTO from "@shared/container/providers/ApiRequestProvider/dtos/ICreateRequestDTO";
import IApiRequestProvider from "@shared/container/providers/ApiRequestProvider/models/IApiRequestProvider";
import { injectable, inject } from "tsyringe";
import IAgenda from "../dtos/IAgenda";
import ItemDistributionService from "./ItemDistributionService";

interface IRequest {
    config: ICreateRequestDTO;
}


@injectable()
class ReprocessItensService {
    constructor(
        @inject('ApiRequestProvider')
        private apiRequestProvider: IApiRequestProvider
    ) { }

    public async execute({ config }: IRequest, data: IAgenda): Promise<any> {

        const idsParaUpdateSplited = data.idsParaUpdate.split(",");

        const itemDistributionService = new ItemDistributionService();

        const STATUS_REPROCESSAMENTO = 0;

        const quantidadeDeIdsEnviados = idsParaUpdateSplited.length;

        const quantidades = itemDistributionService.execute(
            data.qtd_pedida,
            quantidadeDeIdsEnviados,
        );

        const payloadParaRequisicao = {
            status: STATUS_REPROCESSAMENTO,
            ids: idsParaUpdateSplited,
            quantidades,
        };

        const response = await this.apiRequestProvider.post({
            url: config.url,
            body: payloadParaRequisicao,
            auth: config.auth
        });

        return response;
    }
}

export default ReprocessItensService;
