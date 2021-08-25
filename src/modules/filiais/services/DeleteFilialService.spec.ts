import DeleteFilialService from "@modules/filiais/services/DeleteFilialService";
import FakeFiliaisRepository from "@modules/filiais/repositories/fakes/FakeFiliaisRepository";
import AppError from "@shared/errors/AppError";

let deleteFilialService: DeleteFilialService;
let fakeFiliaisRepository: FakeFiliaisRepository;

describe("DeleteFilialService", () => {
    beforeEach(() => {
        fakeFiliaisRepository = new FakeFiliaisRepository();
        deleteFilialService = new DeleteFilialService(fakeFiliaisRepository);
    });

    it("shoud be able delete a filial existing", async () => {
        const filial = await fakeFiliaisRepository.create({
            numero: "123",
            nome: "filial1",
        });

        await deleteFilialService.execute(filial.id);

        expect(await fakeFiliaisRepository.findById(filial.id)).toBe(undefined);
    });

    it("shoud not be able delete a filial non-existing", async () => {
        await expect(
            deleteFilialService.execute("qualquer"),
        ).rejects.toBeInstanceOf(AppError);
    });
});
