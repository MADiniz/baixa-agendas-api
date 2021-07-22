import ListaAgendasExternasService from "@modules/agendas/services/ListaAgendasExternasService";
import IAgenda from "@modules/agendas/dtos/IAgenda";
import externalApi from "@config/externalApi";
import FakeApiRequestProvider from "@shared/container/providers/ApiRequestProvider/fakes/FakeApiRequestProvider";
import AppError from "@shared/errors/AppError";
import axios from "axios";

jest.mock("axios");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const mockedAxios = axios as jest.Mocked<typeof axios>;

let fakeApiRequestProvider: FakeApiRequestProvider;
let listaAgendasExternasService: ListaAgendasExternasService;
const configListaAgendasRequest = {
    url: `${externalApi.listaAgendas.url}/${externalApi.listaAgendas.resource}`,
    auth: {
        username: externalApi.listaAgendas.user as string,
        password: externalApi.listaAgendas.pass as string,
    },
};

describe("ListaAgendasExternas", () => {
    beforeEach(() => {
        fakeApiRequestProvider = new FakeApiRequestProvider();
        listaAgendasExternasService = new ListaAgendasExternasService(
            fakeApiRequestProvider,
        );
    });

    it("should be to make request to list agendas", async () => {
        mockedAxios.get.mockResolvedValueOnce({
            data: [
                {
                    agenda: "599 lixos {quebra de seções.}. (Quebras)",
                    cod_produto: 0,
                    codigoFilial: "qualquer",
                    filial: "qualquer",
                    idsParaUpdate: "qualquer",
                    qtd_pedida: 0,
                    status: 0,
                    cliente: "qualquer",
                },
            ],
        });

        const agendasExpeted: IAgenda[] = [
            {
                agenda: "599 lixos {quebra de seções.}. (Quebras)",
                cod_produto: 0,
                codigoFilial: "qualquer",
                filial: "qualquer",
                idsParaUpdate: "qualquer",
                qtd_pedida: 0,
                status: 0,
                cliente: "qualquer",
            },
        ];

        const agendas = await listaAgendasExternasService.execute({
            config: configListaAgendasRequest,
        });

        expect(agendas[0].agenda).toContain(agendasExpeted[0].agenda);
    });

    it("should not be able to make request to a api without a auth", async () => {
        await expect(
            listaAgendasExternasService.execute({
                config: configListaAgendasRequest,
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it("should return an error if authenticate were not received", async () => {
        await expect(
            listaAgendasExternasService.execute({
                config: { url: "qualquer url" },
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it("should return an error if it were bad request", async () => {
        jest.spyOn(axios, "create").mockImplementationOnce(() => {
            throw new Error();
        });

        await expect(
            listaAgendasExternasService.execute({
                config: configListaAgendasRequest,
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
