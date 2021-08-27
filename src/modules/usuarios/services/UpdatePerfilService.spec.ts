import AppError from "@shared/errors/AppError";
import FakeFiliaisRepository from "@modules/filiais/repositories/fakes/FakeFiliaisRepository";
import UpdatePerfilService from "./UpdatePerfilService";
import FakeUsuariosRepository from "../repositories/fakes/FakeUsuariosRepository";
import FakeHashProvider from "../providers/HashProvider/fakes/FakeHashProvider";

let updatePerfilService: UpdatePerfilService;
let fakeFiliaisRepository: FakeFiliaisRepository;
let fakeUsuariosRepository: FakeUsuariosRepository;
let fakeHashProvider: FakeHashProvider;

describe("UpdatePerfil", () => {
    beforeEach(() => {
        fakeHashProvider = new FakeHashProvider();
        fakeFiliaisRepository = new FakeFiliaisRepository();
        fakeUsuariosRepository = new FakeUsuariosRepository();
        updatePerfilService = new UpdatePerfilService(
            fakeUsuariosRepository,
            fakeHashProvider,
            fakeFiliaisRepository,
        );
    });

    it("should be update a perfil", async () => {
        const usuario = await fakeUsuariosRepository.create({
            nome: "Alexandre",
            email: "alexandre@gmail.com",
            filial_id: "qualquer",
            password: "123",
        });

        const usuarioAtualizado = await updatePerfilService.execute({
            user_id: usuario.id,
            nome: "Alex",
            email: usuario.email,
        });

        expect(usuarioAtualizado.nome).toBe("Alex");
    });

    it("should not be able update a perfil from a non-existing usuario", async () => {
        await expect(
            updatePerfilService.execute({
                user_id: "usuario",
                nome: "Alex",
                email: "email qualquer",
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it("should not be able update a perfil from a non-existing usuario", async () => {
        await expect(
            updatePerfilService.execute({
                user_id: "usuario",
                nome: "Alex",
                email: "email qualquer",
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it("should not be able to change to email from other usuario", async () => {
        await fakeUsuariosRepository.create({
            nome: "Alexandre Magno de Carvalho",
            email: "alexandremagno@p4pro.com.br",
            filial_id: "123456",
            password: "123456",
        });

        const user = await fakeUsuariosRepository.create({
            nome: "usuario qualquer",
            email: "alex@p4pro.com.br",
            filial_id: "123456",
            password: "123456",
        });

        await expect(
            updatePerfilService.execute({
                user_id: user.id,
                nome: "Alex",
                email: "alexandremagno@p4pro.com.br",
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it("should be able to update the password", async () => {
        const user = await fakeUsuariosRepository.create({
            nome: "Alexandre Magno de Carvalho",
            email: "alexandremagno@p4pro.com.br",
            filial_id: "123456",
            password: "123456",
        });

        await updatePerfilService.execute({
            user_id: user.id,
            nome: "Alexandre Magno de Carvalho",
            email: "alexandremagno@p4pro.com.br",
            password: "123",
            old_password: "123456",
        });

        expect(user.password).toBe("123");
    });

    it("should not be able to update the password without old password", async () => {
        const user = await fakeUsuariosRepository.create({
            nome: "Alexandre Magno de Carvalho",
            email: "alexandremagno@p4pro.com.br",
            filial_id: "123456",
            password: "123456",
        });

        await expect(
            updatePerfilService.execute({
                user_id: user.id,
                nome: "Alexandre Magno de Carvalho",
                email: "alexandremagno@p4pro.com.br",
                password: "123",
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it("should not be able to update the password with wrong old password", async () => {
        const user = await fakeUsuariosRepository.create({
            nome: "Alexandre Magno de Carvalho",
            email: "alexandremagno@p4pro.com.br",
            filial_id: "123456",
            password: "123456",
        });

        await expect(
            updatePerfilService.execute({
                user_id: user.id,
                nome: "Alexandre Magno de Carvalho",
                email: "alexandremagno@p4pro.com.br",
                password: "123",
                old_password: "12345",
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it("should be able to update the filial from an user", async () => {
        const filial1 = await fakeFiliaisRepository.create({
            numero: "001",
            nome: "filial01",
        });

        const filial2 = await fakeFiliaisRepository.create({
            numero: "002",
            nome: "filial02",
        });

        const user = await fakeUsuariosRepository.create({
            nome: "Alexandre Magno de Carvalho",
            email: "alexandremagno@p4pro.com.br",
            filial_id: "123456",
            password: "123",
        });

        const oldUserFilialId = user.filial_id;

        await updatePerfilService.execute({
            user_id: user.id,
            nome: user.nome,
            email: user.email,
            filial_id: filial1.id,
        });

        expect(user.filial_id).not.toEqual(oldUserFilialId);
    });

    it("should not be able to update the filial from without a filial sent", async () => {
        const user = await fakeUsuariosRepository.create({
            nome: "Alexandre Magno de Carvalho",
            email: "alexandremagno@p4pro.com.br",
            filial_id: "123456",
            password: "123",
        });

        await updatePerfilService.execute({
            user_id: user.id,
            nome: user.nome,
            email: user.email,
        });

        expect(user.filial_id).toBe("123456");
    });

    it("should not be able to update the filial from with a filial non-existing", async () => {
        const user = await fakeUsuariosRepository.create({
            nome: "Alexandre Magno de Carvalho",
            email: "alexandremagno@p4pro.com.br",
            filial_id: "123456",
            password: "123",
        });

        await expect(
            updatePerfilService.execute({
                user_id: user.id,
                nome: user.nome,
                email: user.email,
                filial_id: "qualquer",
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
