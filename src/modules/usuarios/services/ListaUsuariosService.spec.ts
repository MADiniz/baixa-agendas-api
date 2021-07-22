import FakeUsuariosRepository from "../repositories/fakes/FakeUsuariosRepository";
import ListaUsuariosService from "./ListaUsuariosService";

let fakeUsuariosRepository: FakeUsuariosRepository;
let listaUsuariosService: ListaUsuariosService;

describe("ListaUsuarios", () => {
    beforeEach(() => {
        fakeUsuariosRepository = new FakeUsuariosRepository();
        listaUsuariosService = new ListaUsuariosService(fakeUsuariosRepository);
    });

    it("should be able list usuarios", async () => {
        const user1 = await fakeUsuariosRepository.create({
            nome: "Alexandre",
            email: "alexandre@gmail.com",
            filial_id: "qualquer",
            password: "123",
        });

        const user2 = await fakeUsuariosRepository.create({
            nome: "Sarah",
            email: "Sarah@gmail.com",
            filial_id: "qualquer",
            password: "123",
        });

        const usuarios = await listaUsuariosService.execute();

        expect(usuarios).toEqual([user1, user2]);
    });
});
