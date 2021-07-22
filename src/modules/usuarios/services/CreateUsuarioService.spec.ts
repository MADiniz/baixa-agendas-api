import AppError from "@shared/errors/AppError";
import FakeHashProvider from "../providers/HashProvider/fakes/FakeHashProvider";
import FakeUsuariosRepository from "../repositories/fakes/FakeUsuariosRepository";
import CreateUsuarioService from "./CreateUsuarioService";

describe("CreateUsuario", () => {
    it("should be able create a new usuario", async () => {
        const fakeUsuariosRepository = new FakeUsuariosRepository();
        const fakeHashProvider = new FakeHashProvider();
        const createUsuarioService = new CreateUsuarioService(
            fakeUsuariosRepository,
            fakeHashProvider,
        );

        const usuario = await createUsuarioService.execute({
            nome: "Alexandre",
            email: "alexandre@gmail.com.br",
            password: "123",
            filial_id: "123456",
        });

        expect(usuario).toHaveProperty("id");
    });

    it("should not be able create a new usuario as same email", async () => {
        const fakeUsuariosRepository = new FakeUsuariosRepository();
        const fakeHashProvider = new FakeHashProvider();
        const createUsuarioService = new CreateUsuarioService(
            fakeUsuariosRepository,
            fakeHashProvider,
        );

        const usuario = await createUsuarioService.execute({
            nome: "Alexandre",
            email: "alexandre@gmail.com.br",
            password: "123",
            filial_id: "123456",
        });

        expect(
            createUsuarioService.execute({
                nome: "Alexandre",
                email: "alexandre@gmail.com.br",
                password: "123",
                filial_id: "123456",
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
