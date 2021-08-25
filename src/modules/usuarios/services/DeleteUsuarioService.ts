/* eslint-disable prettier/prettier */
import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import IUsuariosRepository from "../repositories/IUsuariosRepository";

@injectable()
export default class DeleteUsuarioService {
    constructor(
        @inject("UsuariosRepository")
        private usuariosRepository: IUsuariosRepository,
    ) { }

    public async execute(usuario_id: string): Promise<void> {
        const usuario = await this.usuariosRepository.findById(usuario_id);

        if (!usuario) {
            throw new AppError("Usuario não encontrado");
        }

        return this.usuariosRepository.delete(usuario.id);
    }
}
