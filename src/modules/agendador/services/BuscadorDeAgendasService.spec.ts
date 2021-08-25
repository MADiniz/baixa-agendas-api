import BuscadorDeAgendasService from "./BuscadorDeAgendasService";
import FakeAgendadorDeTarefas from "../entities/fakes/FakeAgendadorDeTarefas";

let buscadorDeAgendas: BuscadorDeAgendasService;
let fakeAgendadorDeTarefas: FakeAgendadorDeTarefas;

describe("BuscadorDeAgendas", () => {
    beforeEach(() => {
        fakeAgendadorDeTarefas = new FakeAgendadorDeTarefas();
        buscadorDeAgendas = new BuscadorDeAgendasService(
            fakeAgendadorDeTarefas,
        );
    });

    it("should be able schedule a task", async () => {
        const agendadorDeTarefas = jest.spyOn(
            fakeAgendadorDeTarefas,
            "agendaTarefa",
        );

        await buscadorDeAgendas.execute();

        expect(agendadorDeTarefas).toHaveBeenCalled();
    });
});
