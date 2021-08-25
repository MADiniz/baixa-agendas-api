import AppError from "@shared/errors/AppError";
import DeleteUsuarioService from "./DeleteUsuarioService";
import FakeUsuariosRepository from "../repositories/fakes/FakeUsuariosRepository";

let deleteUsuarioService: DeleteUsuarioService;
let fakeUsuariosRepository: FakeUsuariosRepository;

describe("DeleteUsuarioService", () => {
    beforeEach(() => {
        fakeUsuariosRepository = new FakeUsuariosRepository();
        deleteUsuarioService = new DeleteUsuarioService(fakeUsuariosRepository);
    });

    it("shoud be able delete a usuario existing", async () => {
        const usuario = await fakeUsuariosRepository.create({
            nome: "usuario1",
            email: "usuario1@gmail.com",
            filial_id: "1235",
            password: "1234",
        });

        await deleteUsuarioService.execute(usuario.id);

        expect(await fakeUsuariosRepository.findById(usuario.id)).toBe(
            undefined,
        );
    });

    it("shoud not be able delete a usuario non-existing", async () => {
        await expect(
            deleteUsuarioService.execute("qualquer"),
        ).rejects.toBeInstanceOf(AppError);
    });
});
