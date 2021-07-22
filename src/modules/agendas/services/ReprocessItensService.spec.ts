import ReprocessItensService from "@modules/agendas/services/ReprocessItensService";
import externalApi from "@config/externalApi";
import FakeApiRequestProvider from "@shared/container/providers/ApiRequestProvider/fakes/FakeApiRequestProvider";
import AppError from "@shared/errors/AppError";
import axios from "axios";
import IAgenda from "../dtos/IAgenda";

jest.mock("axios");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const mockedAxios = axios as jest.Mocked<typeof axios>;

let fakeApiRequestProvider: FakeApiRequestProvider;
let reprocessItensService: ReprocessItensService;

describe("ReprocessItens", () => {
    beforeEach(() => {
        fakeApiRequestProvider = new FakeApiRequestProvider();
        reprocessItensService = new ReprocessItensService(
            fakeApiRequestProvider,
        );
    });

    it("should be to make request to a api", async () => {
        const config = {
            url: `${externalApi.listaAgendas.url}/baixa/update`,
            auth: {
                username: externalApi.listaAgendas.user as string,
                password: externalApi.listaAgendas.pass as string,
            },
        };

        mockedAxios.post.mockResolvedValueOnce({
            data: { status: "Ok!" },
        });

        const agenda: IAgenda = {
            agenda: "599 lixos {quebra de seções.}. (Quebras)",
            codigoDoProduto: 1,
            codigoFilial: "qualquer",
            filial: "qualquer",
            idsParaUpdate: "qualquer",
            quantidadePedida: 1,
            status: 1,
        };

        const response = await reprocessItensService.execute(
            { config },
            agenda,
        );

        expect(response).toMatchObject<any>({ status: "Ok!" });
    });

    it("should not be able to make request to a api without a auth", async () => {
        const config = {
            url: `${externalApi.listaAgendas.url}/baixa/update`,
        };

        const agenda: IAgenda = {
            agenda: "599 lixos {quebra de seções.}. (Quebras)",
            codigoDoProduto: 1,
            codigoFilial: "qualquer",
            filial: "qualquer",
            idsParaUpdate: "qualquer",
            quantidadePedida: 1,
            status: 1,
        };

        await expect(
            reprocessItensService.execute({ config }, agenda),
        ).rejects.toBeInstanceOf(AppError);
    });

    it("should return an error if it were bad request", async () => {
        const config = {
            url: `${externalApi.listaAgendas.url}/baixa/update`,
            auth: {
                username: externalApi.listaAgendas.user as string,
                password: externalApi.listaAgendas.pass as string,
            },
        };

        jest.spyOn(axios, "create").mockImplementationOnce(() => {
            throw new Error();
        });

        const agenda: IAgenda = {
            agenda: "599 lixos {quebra de seções.}. (Quebras)",
            codigoDoProduto: 1,
            codigoFilial: "qualquer",
            filial: "qualquer",
            idsParaUpdate: "qualquer",
            quantidadePedida: 1,
            status: 1,
        };

        await expect(
            reprocessItensService.execute({ config }, agenda),
        ).rejects.toBeInstanceOf(AppError);
    });
});
