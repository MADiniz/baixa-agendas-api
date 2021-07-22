import { container } from "tsyringe";

import "@modules/usuarios/providers";
import "@shared/container/providers";

import IUsuariosRepository from "@modules/usuarios/repositories/IUsuariosRepository";
import UsuariosRepository from "@modules/usuarios/infra/typeorm/repositories/UsuariosRepository";

import IFiliaisRepository from "@modules/filiais/repositories/IFiliaisRepository";
import FiliaisRepository from "@modules/filiais/infra/typeorm/repositories/FiliaisRepository";

import IAgendasRepository from "@modules/agendas/repositories/IAgendasRepository";
import AgendasRepository from "@modules/agendas/infra/typeorm/repositories/AgendasRepository";

import IAgendadorDeTarefas from "@modules/agendador/entities/IAgendadorDeTarefas";
import AgendadorDeTarefas from "@modules/agendador/entities/AgendadorDeTarefas";

container.registerSingleton<IUsuariosRepository>(
    "UsuariosRepository",
    UsuariosRepository,
);
container.registerSingleton<IFiliaisRepository>(
    "FiliaisRepository",
    FiliaisRepository,
);
container.registerSingleton<IAgendasRepository>(
    "AgendasRepository",
    AgendasRepository,
);

container.registerSingleton<IAgendadorDeTarefas>(
    "AgendadorDeTarefas",
    AgendadorDeTarefas,
);
