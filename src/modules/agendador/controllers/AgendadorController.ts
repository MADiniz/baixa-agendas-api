import { container } from "tsyringe";
import BuscadorDeAgendasService from "@modules/agendador/services/BuscadorDeAgendasService";

export default class AgendadorController {
    public execute(): void {
        const buscadorDeAgendasService = container.resolve(
            BuscadorDeAgendasService,
        );

        buscadorDeAgendasService.execute();
    }
}
