/* eslint-disable prettier/prettier */
import { injectable, inject } from "tsyringe";

import AppError from "@shared/errors/AppError";
import IFiliaisRepository from "@modules/filiais/repositories/IFiliaisRepository";
import IUsuariosRepository from "../repositories/IUsuariosRepository";
import Usuario from "../infra/typeorm/entities/Usuario";

interface IRequest {
    user_id: string;
}

@injectable()
export default class ListaPerfilService {
    constructor(
        @inject("UsuariosRepository")
        private usuariosRepository: IUsuariosRepository,

        @inject("FiliaisRepository")
        private filiaisRepository: IFiliaisRepository,
    ) { }

    public async execute({ user_id }: IRequest): Promise<Usuario> {
        const user = await this.usuariosRepository.findById(user_id);

        if (!user) {
            throw new AppError("User not found");
        }

        if (user.filial_id) {
            const filial = await this.filiaisRepository.findById(user.filial_id);
            if (filial) {
                user.filial = filial;
            }
        }

        return user;
    }
}
