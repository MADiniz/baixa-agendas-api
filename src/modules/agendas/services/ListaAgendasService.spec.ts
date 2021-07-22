import ListaAgendasService from "@modules/agendas/services/ListaAgendasService";
import FakeAgendasRepository from "../repositories/fakes/FakeAgendasRepository";
import TIPOAGENDA from "../utils/tipoAgenda";

let agendasRepository: FakeAgendasRepository;
let listaAgendaService: ListaAgendasService;

describe("ListaAgendas", () => {
    beforeEach(() => {
        agendasRepository = new FakeAgendasRepository();
        listaAgendaService = new ListaAgendasService(agendasRepository);
    });

    it("should be able list agendas", async () => {
        const agenda1 = await agendasRepository.create({
            nome: "599 lixos {quebra de seções.}. (Quebras)",
            codigoProduto: "0",
            idsParaUpdate: "qualquer",
            quantidadePedida: 0,
            status: 0,
            filial_id: "1234",
        });

        const agenda2 = await agendasRepository.create({
            nome: "599 lixos {quebra de seções.}. (Quebras)",
            codigoProduto: "0",
            idsParaUpdate: "qualquer",
            quantidadePedida: 0,
            status: 0,
            filial_id: "2345",
        });

        const agendas = await listaAgendaService.execute();

        expect(agendas).toEqual([agenda1, agenda2]);
    });

    it("should be able list agendas to process", async () => {
        const agenda1 = await agendasRepository.create({
            nome: "599 lixos {quebra de seções.}. (Quebras)",
            codigoProduto: "0",
            idsParaUpdate: "qualquer",
            quantidadePedida: 0,
            status: 0,
            filial_id: "1234",
        });

        const agenda2 = await agendasRepository.create({
            nome: "599 lixos {quebra de seções.}. (Quebras)",
            codigoProduto: "0",
            idsParaUpdate: "qualquer",
            quantidadePedida: 0,
            status: 2,
            filial_id: "2345",
        });

        const agendas = await listaAgendaService.execute(TIPOAGENDA.Processar);

        expect(agendas).toEqual([agenda1]);
    });

    it("should be able list failures agendas", async () => {
        const agenda1 = await agendasRepository.create({
            nome: "599 lixos {quebra de seções.}. (Quebras)",
            codigoProduto: "0",
            idsParaUpdate: "qualquer",
            quantidadePedida: 0,
            status: 3,
            filial_id: "1234",
        });

        const agenda2 = await agendasRepository.create({
            nome: "599 lixos {quebra de seções.}. (Quebras)",
            codigoProduto: "0",
            idsParaUpdate: "qualquer",
            quantidadePedida: 0,
            status: 2,
            filial_id: "2345",
        });

        const agenda3 = await agendasRepository.create({
            nome: "599 lixos {quebra de seções.}. (Quebras)",
            codigoProduto: "0",
            idsParaUpdate: "qualquer",
            quantidadePedida: 0,
            status: 4,
            filial_id: "2345",
        });

        const agendas = await listaAgendaService.execute(TIPOAGENDA.Erro);

        expect(agendas).toEqual([agenda1, agenda3]);
    });
});
