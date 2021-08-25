import FakeFiliaisRepository from "../repositories/fakes/FakeFiliaisRepository";
import ListAllFiliaisService from "./ListAllFiliaisService";

let fakeFiliaisRepository: FakeFiliaisRepository;
let listAllFiliaisService: ListAllFiliaisService;

describe("ListAllFiliais", () => {
    beforeEach(() => {
        fakeFiliaisRepository = new FakeFiliaisRepository();
        listAllFiliaisService = new ListAllFiliaisService(
            fakeFiliaisRepository,
        );
    });

    it("should be able list all filiais", async () => {
        const filial1 = await fakeFiliaisRepository.create({
            numero: "12345",
            nome: "filia 1",
        });

        const filial2 = await fakeFiliaisRepository.create({
            numero: "54321",
            nome: "filia 2",
        });

        const filiais = await listAllFiliaisService.execute();

        expect(filiais).toEqual([filial1, filial2]);
    });
});
