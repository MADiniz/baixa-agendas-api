export default {
    listaAgendas: {
        url: `${process.env.BASE_URL_LISTA_AGENDAS}`,
        user: `${process.env.USER_LISTA_AGENDAS}`,
        pass: `${process.env.PASS_LISTA_AGENDAS}`,
        resource: `${process.env.RESOURCE_LISTA_AGENDAS}`,
    },
    reprocessaAgendas: {
        url: `${process.env.BASE_URL_REPROCESSA_AGENDA}`,
        user: `${process.env.USER_REPROCESSA_AGENDAS}`,
        pass: `${process.env.PASS_REPROCESSA_AGENDAS}`,
        resource: `${process.env.RESOURCE_REPROCESSA_AGENDAS}`,
    },
};
