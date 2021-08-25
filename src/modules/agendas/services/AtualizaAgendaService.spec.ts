import AppError from "@shared/errors/AppError";
import FakeAgendasRepository from "../repositories/fakes/FakeAgendasRepository";
import AtualizaAgendaService from "./AtualizaAgendaService";

let fakeAgendasRepository: FakeAgendasRepository;
let atualizaAgendaService: AtualizaAgendaService;

describe("UpdateAgenda", () => {
    beforeEach(() => {
        fakeAgendasRepository = new FakeAgendasRepository();
        atualizaAgendaService = new AtualizaAgendaService(
            fakeAgendasRepository,
        );
    });

    it("should be update a agenda", async () => {
        const agenda = await fakeAgendasRepository.create({
            nome: "599 lixos {quebra de seções.}. (Quebras)",
            codigoProduto: "1",
            filial_id: "123456",
            idsParaUpdate: "111",
            quantidadePedida: 0,
            status: 0,
        });

        await atualizaAgendaService.execute({
            id: agenda.id,
            nome: "599 lixos {quebra de seções.}. (Quebras)",
            codigoProduto: "1",
            codigoFilial: "123456",
            idsParaUpdate: "111",
            quantidadePedida: 0,
            status: 1,
        });

        expect(agenda.status).toBe(1);
    });

    it("should not be update a non-existing agenda", async () => {
        const agenda = await fakeAgendasRepository.create({
            nome: "599 lixos {quebra de seções.}. (Quebras)",
            codigoProduto: "1",
            filial_id: "123456",
            idsParaUpdate: "111",
            quantidadePedida: 0,
            status: 0,
        });

        await expect(
            atualizaAgendaService.execute({
                id: "non-existing",
                nome: "599 lixos {quebra de seções.}. (Quebras)",
                codigoProduto: "1",
                codigoFilial: "123456",
                idsParaUpdate: "111",
                quantidadePedida: 0,
                status: 1,
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
