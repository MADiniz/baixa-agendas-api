import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import "reflect-metadata";
import "dotenv/config";
import routes from "@shared/infra/http/routes";
import AgendadorController from "@modules/agendador/controllers/AgendadorController";
import AppLog from "@shared/logs/AppLog";
import cors from "cors";

import "@shared/infra/typeorm";
import "@shared/container";

import AppError from "@shared/errors/AppError";
import { errors } from "celebrate";

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errors());
app.use(
    (
        error: Error,
        request: Request,
        response: Response,
        next: NextFunction,
    ) => {
        if (error instanceof AppError) {
            return response
                .status(error.statusCode)
                .json({ status: "error", message: error.message });
        }
        return response
            .status(500)
            .json({ status: "error", message: "internal server error" });
    },
);

app.listen(process.env.PORT || 3333, () => {
    const log = new AppLog(new Date(), "servidor rodando na porta 3333");

    const agendadorDeTarefa = new AgendadorController();
    agendadorDeTarefa.execute();
});
