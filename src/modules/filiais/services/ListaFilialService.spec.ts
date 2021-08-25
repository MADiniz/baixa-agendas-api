import FakeFiliaisRepository from "../repositories/fakes/FakeFiliaisRepository";
import ListaFilialService from "./ListaFilialService";

let fakeFiliaisRepository: FakeFiliaisRepository;
let listaFilialService: ListaFilialService;

describe("ListaFilialService", () => {
    beforeEach(() => {
        fakeFiliaisRepository = new FakeFiliaisRepository();
        listaFilialService = new ListaFilialService(fakeFiliaisRepository);
    });

    it("Shoud be able list filial by numero", async () => {
        const filialExpected = await fakeFiliaisRepository.create({
            numero: "123",
            nome: "filial1",
        });

        const filialResult = await listaFilialService.execute({
            numero: "123",
        });

        expect(filialResult).toEqual(filialExpected);
    });

    it("Shoud be able list filial by id", async () => {
        const filialExpected = await fakeFiliaisRepository.create({
            numero: "123",
            nome: "filial1",
        });

        const filialResult = await listaFilialService.execute({
            id: filialExpected.id,
        });

        expect(filialResult).toEqual(filialExpected);
    });
});
