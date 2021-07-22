import FakeFiliaisRepository from "@modules/filiais/repositories/fakes/FakeFiliaisRepository";
import AppError from "@shared/errors/AppError";

import FakeUsuariosRepository from "../repositories/fakes/FakeUsuariosRepository";
import ListaPerfilService from "./ListaPerfilService";

let fakeUsuariosRepository: FakeUsuariosRepository;
let listaPerfilService: ListaPerfilService;
let fakeFiliaisRepository: FakeFiliaisRepository;

describe("ShowProfile", () => {
    beforeEach(() => {
        fakeUsuariosRepository = new FakeUsuariosRepository();
        fakeFiliaisRepository = new FakeFiliaisRepository();

        listaPerfilService = new ListaPerfilService(
            fakeUsuariosRepository,
            fakeFiliaisRepository,
        );
    });

    it("should be able to show the profile", async () => {
        const user = await fakeUsuariosRepository.create({
            nome: "Alexandre Magno",
            email: "alexandre@exemplo.com",
            password: "123456",
            filial_id: "123456",
        });

        const profile = await listaPerfilService.execute({
            user_id: user.id,
        });

        expect(profile.nome).toBe("Alexandre Magno");
        expect(profile.email).toBe("alexandre@exemplo.com");
    });

    it("should not be able to show the profile from a non-existing user", async () => {
        await expect(
            listaPerfilService.execute({
                user_id: "id-usuario-nao-existente",
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
