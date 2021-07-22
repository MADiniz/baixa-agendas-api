import AgendadorController from "@modules/agendador/controllers/AgendadorController";

(async () => {
    const agendadorDeTarefa = new AgendadorController();

    await agendadorDeTarefa.execute();

    console.log("encerrou");
})();
