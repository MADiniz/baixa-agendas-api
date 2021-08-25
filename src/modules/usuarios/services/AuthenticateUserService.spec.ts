import "dotenv/config";
import AppError from "@shared/errors/AppError";
import FakeUsuariosRepository from "@modules/usuarios/repositories/fakes/FakeUsuariosRepository";
import FakeHashProvider from "@modules/usuarios/providers/HashProvider/fakes/FakeHashProvider";
import AuthenticateUserService from "./AuthenticateUserService";
import CreateUsuarioService from "./CreateUsuarioService";

describe("AuthenticateUser", () => {
    it("should be able to authenticate", async () => {
        const fakeUsersRepository = new FakeUsuariosRepository();
        const fakeHashProvider = new FakeHashProvider();
        const authenticateUserService = new AuthenticateUserService(
            fakeUsersRepository,
            fakeHashProvider,
        );
        const createUsuarioService = new CreateUsuarioService(
            fakeUsersRepository,
            fakeHashProvider,
        );

        await createUsuarioService.execute({
            email: "alexandre@gmail.com.br",
            nome: "alexandre",
            password: "123456",
            filial_id: "1234",
        });

        const userAuthenticated = await authenticateUserService.execute({
            email: "alexandre@gmail.com.br",
            password: "123456",
        });

        expect(userAuthenticated).toHaveProperty("token");
    });

    it("should not be able to authenticate as incorrect email", async () => {
        const fakeUsersRepository = new FakeUsuariosRepository();
        const fakeHashProvider = new FakeHashProvider();
        const authenticateUserService = new AuthenticateUserService(
            fakeUsersRepository,
            fakeHashProvider,
        );
        const createUsuarioService = new CreateUsuarioService(
            fakeUsersRepository,
            fakeHashProvider,
        );

        await createUsuarioService.execute({
            email: "alexandre@gmail.com.br",
            nome: "alexandre",
            password: "123456",
            filial_id: "1234",
        });

        expect(
            authenticateUserService.execute({
                email: "alexandre@gmail.com.",
                password: "123456",
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it("should not be able to authenticate as incorrect password", async () => {
        const fakeUsersRepository = new FakeUsuariosRepository();
        const fakeHashProvider = new FakeHashProvider();
        const authenticateUserService = new AuthenticateUserService(
            fakeUsersRepository,
            fakeHashProvider,
        );
        const createUsuarioService = new CreateUsuarioService(
            fakeUsersRepository,
            fakeHashProvider,
        );

        await createUsuarioService.execute({
            email: "alexandre@gmail.com.br",
            nome: "alexandre",
            password: "123456",
            filial_id: "1234",
        });

        expect(
            authenticateUserService.execute({
                email: "alexandre@gmail.com.br",
                password: "1234567",
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
