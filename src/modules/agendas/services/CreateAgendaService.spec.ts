import FakeAgendasRepository from "../repositories/fakes/FakeAgendasRepository";
import CreateAgendaService from "./CreateAgendaService";

let fakeAgendasRepository: FakeAgendasRepository;
let createAgendaService: CreateAgendaService;

describe("CreateAgenda", () => {
    beforeEach(() => {
        fakeAgendasRepository = new FakeAgendasRepository();
        createAgendaService = new CreateAgendaService(fakeAgendasRepository);
    });

    it("should be able create a new agenda", async () => {
        const agenda = await createAgendaService.execute({
            nome: "599 lixos {quebra de seções.}. (Quebras)",
            codigoProduto: "1",
            filial_id: "123456",
            idsParaUpdate: "111",
            quantidadePedida: 0,
            status: 1,
            cliente: "123456",
        });
        expect(agenda).toHaveProperty("id");
    });

    it("should be able create a record of cliente field on agenda", async () => {
        const agenda = await createAgendaService.execute({
            nome: "599 lixos {quebra de seções.}. (Quebras)",
            codigoProduto: "1",
            filial_id: "123456",
            idsParaUpdate: "111",
            quantidadePedida: 0,
            status: 1,
            cliente: "123456",
        });
        expect(agenda).toHaveProperty("cliente");
    });
});
