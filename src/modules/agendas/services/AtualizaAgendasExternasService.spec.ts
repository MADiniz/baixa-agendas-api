import AtualizaAgendasExternasService from "@modules/agendas/services/AtualizaAgendasExternasService";
import externalApi from "@config/externalApi";
import FakeApiRequestProvider from "@shared/container/providers/ApiRequestProvider/fakes/FakeApiRequestProvider";
import AppError from "@shared/errors/AppError";
import axios from "axios";
import IAgenda from "../dtos/IAgenda";

jest.mock("axios");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const mockedAxios = axios as jest.Mocked<typeof axios>;

let fakeApiRequestProvider: FakeApiRequestProvider;
let atualizaAgendasExternasService: AtualizaAgendasExternasService;

const config = {
    url: `${externalApi.reprocessaAgendas.url}/${externalApi.reprocessaAgendas.resource}`,
    auth: {
        username: externalApi.reprocessaAgendas.user as string,
        password: externalApi.reprocessaAgendas.pass as string,
    },
};

describe("ReprocessAgendasExternas", () => {
    beforeEach(() => {
        fakeApiRequestProvider = new FakeApiRequestProvider();
        atualizaAgendasExternasService = new AtualizaAgendasExternasService(
            fakeApiRequestProvider,
        );
    });

    it("should be to make request to a api", async () => {
        mockedAxios.post.mockResolvedValueOnce({
            data: { status: "Ok!" },
        });

        const agendas: IAgenda[] = [
            {
                agenda: "599 lixos {quebra de seções.}. (Quebras)",
                cod_produto: 1,
                codigoFilial: "qualquer",
                filial: "qualquer",
                idsParaUpdate: "qualquer",
                qtd_pedida: 1,
                status: 1,
                cliente: "qualquer",
            },
        ];

        const response = await atualizaAgendasExternasService.execute({
            config,
            agendas,
        });

        expect(response).toMatchObject<any>({ status: "Ok!" });
    });

    it("should not be able to make request to a api without a auth", async () => {
        const agendas: IAgenda[] = [
            {
                agenda: "599 lixos {quebra de seções.}. (Quebras)",
                cod_produto: 1,
                codigoFilial: "qualquer",
                filial: "qualquer",
                idsParaUpdate: "qualquer",
                qtd_pedida: 1,
                status: 1,
                cliente: "qualquer",
            },
        ];

        await expect(
            atualizaAgendasExternasService.execute({ config, agendas }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it("should return an error if it were bad request", async () => {
        jest.spyOn(axios, "create").mockImplementationOnce(() => {
            throw new Error();
        });

        const agendas: IAgenda[] = [
            {
                agenda: "599 lixos {quebra de seções.}. (Quebras)",
                cod_produto: 1,
                codigoFilial: "qualquer",
                filial: "qualquer",
                idsParaUpdate: "qualquer",
                qtd_pedida: 1,
                status: 1,
                cliente: "qualquer",
            },
        ];

        await expect(
            atualizaAgendasExternasService.execute({ config, agendas }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
