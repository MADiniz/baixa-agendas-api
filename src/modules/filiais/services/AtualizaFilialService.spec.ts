import AppError from "@shared/errors/AppError";
import AtualizaFilialService from "./AtualizaFilialService";
import FakeFiliaisRepository from "../repositories/fakes/FakeFiliaisRepository";

let fakeFiliaisRepository: FakeFiliaisRepository;
let atualizaFilialService: AtualizaFilialService;

describe("AtualizaFilialService", () => {
    beforeEach(() => {
        fakeFiliaisRepository = new FakeFiliaisRepository();
        atualizaFilialService = new AtualizaFilialService(
            fakeFiliaisRepository,
        );
    });

    it("shoud be able update a filial existing", async () => {
        const filial = await fakeFiliaisRepository.create({
            numero: "1234",
            nome: "filial1",
        });

        await atualizaFilialService.execute({
            filial_id: filial.id,
            nome: "filial2",
            numero: "4321",
        });

        expect(filial.numero).toBe("4321");
        expect(filial.nome).toBe("filial2");
    });

    it("shoud not be able update a filial non-existing", async () => {
        await expect(
            atualizaFilialService.execute({
                filial_id: "qualquer",
                nome: "qualquer",
                numero: "qualquer",
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
