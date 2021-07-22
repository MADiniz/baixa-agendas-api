/* eslint-disable prettier/prettier */
import { injectable, inject } from "tsyringe";
import IApiRequestProvider from "@shared/container/providers/ApiRequestProvider/models/IApiRequestProvider";
import AppError from "@shared/errors/AppError";
import ICreateRequestDTO from "@shared/container/providers/ApiRequestProvider/dtos/ICreateRequestDTO";
import IAgenda from "../dtos/IAgenda";


interface IRequest {
    config: ICreateRequestDTO;
}

@injectable()
class ListaAgendasExternasService {
    constructor(
        @inject('ApiRequestProvider')
        private apiRequestProvider: IApiRequestProvider,
    ) { }

    public async execute({ config }: IRequest): Promise<IAgenda[]> {


        if (!config.auth) {
            throw new AppError("Authenticate is required");
        }

        const agendas: IAgenda[] = await this.apiRequestProvider.get({
            url: config.url,
            auth: config.auth,
        });

        return agendas;
    }
}

export default ListaAgendasExternasService;
