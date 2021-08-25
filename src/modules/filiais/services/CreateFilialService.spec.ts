import AppError from "@shared/errors/AppError";
import FakeFiliaisRepository from "../repositories/fakes/FakeFiliaisRepository";
import CreateFilialService from "./CreateFilialService";

let fakeFiliaisRepository: FakeFiliaisRepository;
let createFilialService: CreateFilialService;

describe("CreateFilial", () => {
    beforeEach(() => {
        fakeFiliaisRepository = new FakeFiliaisRepository();
        createFilialService = new CreateFilialService(fakeFiliaisRepository);
    });

    it("should be able create filial", async () => {
        const filial = await createFilialService.execute({
            numero: "1234",
            nome: "filial1",
        });

        expect(filial).toHaveProperty("id");
    });

    it("should not be able create filial as same numero", async () => {
        const filial = await createFilialService.execute({
            numero: "1234",
            nome: "filial1",
        });

        await expect(
            createFilialService.execute({
                numero: "1234",
                nome: "filial2",
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
