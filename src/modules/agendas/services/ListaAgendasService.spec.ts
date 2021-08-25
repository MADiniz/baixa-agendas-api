import ListaAgendasService from "@modules/agendas/services/ListaAgendasService";
import FakeFiliaisRepository from "@modules/filiais/repositories/fakes/FakeFiliaisRepository";
import FakeUsuariosRepository from "@modules/usuarios/repositories/fakes/FakeUsuariosRepository";
import AppError from "@shared/errors/AppError";
import FakeAgendasRepository from "../repositories/fakes/FakeAgendasRepository";
import TIPOAGENDA from "../utils/tipoAgenda";

let agendasRepository: FakeAgendasRepository;
let listaAgendaService: ListaAgendasService;
let filiaisRepository: FakeFiliaisRepository;
let usuariosRepository: FakeUsuariosRepository;

describe("ListaAgendas", () => {
    beforeEach(() => {
        agendasRepository = new FakeAgendasRepository();
        filiaisRepository = new FakeFiliaisRepository();
        usuariosRepository = new FakeUsuariosRepository();
        listaAgendaService = new ListaAgendasService(
            agendasRepository,
            filiaisRepository,
            usuariosRepository,
        );
    });

    it("should be able list agendas", async () => {
        await filiaisRepository.create({
            numero: "1234",
            nome: "filial1",
        });

        const user = await usuariosRepository.create({
            nome: "Alexandre",
            email: "alexandre@gmail.com.br",
            password: "123",
            filial_id: "1234",
        });

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

        const agendas = await listaAgendaService.execute({ user_id: user.id });

        expect(agendas).toEqual([agenda1, agenda2]);
    });

    it("should be able list agendas to process", async () => {
        const filial1 = await filiaisRepository.create({
            numero: "1234",
            nome: "filial1",
        });

        const filial2 = await filiaisRepository.create({
            numero: "2345",
            nome: "filial2",
        });

        const user = await usuariosRepository.create({
            nome: "Alexandre",
            email: "alexandre@gmail.com.br",
            password: "123",
            filial_id: filial1.id,
        });

        const agenda1 = await agendasRepository.create({
            nome: "599 lixos {quebra de seções.}. (Quebras)",
            codigoProduto: "0",
            idsParaUpdate: "qualquer",
            quantidadePedida: 0,
            status: 0,
            filial_id: filial1.id,
        });

        const agenda2 = await agendasRepository.create({
            nome: "599 lixos {quebra de seções.}. (Quebras)",
            codigoProduto: "0",
            idsParaUpdate: "qualquer",
            quantidadePedida: 0,
            status: 2,
            filial_id: filial2.id,
        });

        const agendas = await listaAgendaService.execute({
            codigo: TIPOAGENDA.Processar,
            user_id: user.id,
        });

        expect(agendas).toEqual([agenda1]);
    });

    it("should be able list failures agendas", async () => {
        const filial1 = await filiaisRepository.create({
            numero: "1234",
            nome: "filial1",
        });

        const filial2 = await filiaisRepository.create({
            numero: "2345",
            nome: "filial2",
        });

        const user = await usuariosRepository.create({
            nome: "Alexandre",
            email: "alexandre@gmail.com.br",
            password: "123",
            filial_id: filial1.id,
        });

        const agenda1 = await agendasRepository.create({
            nome: "599 lixos {quebra de seções.}. (Quebras)",
            codigoProduto: "0",
            idsParaUpdate: "qualquer",
            quantidadePedida: 0,
            status: 3,
            filial_id: filial1.id,
        });

        const agenda2 = await agendasRepository.create({
            nome: "599 lixos {quebra de seções.}. (Quebras)",
            codigoProduto: "0",
            idsParaUpdate: "qualquer",
            quantidadePedida: 0,
            status: 2,
            filial_id: filial1.id,
        });

        const agenda3 = await agendasRepository.create({
            nome: "599 lixos {quebra de seções.}. (Quebras)",
            codigoProduto: "0",
            idsParaUpdate: "qualquer",
            quantidadePedida: 0,
            status: 4,
            filial_id: filial1.id,
        });

        const agendas = await listaAgendaService.execute({
            codigo: TIPOAGENDA.Erro,
            user_id: user.id,
        });

        expect(agendas).toEqual([agenda1, agenda3]);
    });

    it("should not be able list agendas with a usuario non-existig", async () => {
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
            filial_id: "1234",
        });

        await expect(
            listaAgendaService.execute({
                user_id: "qualquer",
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
