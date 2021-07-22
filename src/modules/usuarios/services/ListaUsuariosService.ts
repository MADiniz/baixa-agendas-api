/* eslint-disable prettier/prettier */
import { injectable, inject } from "tsyringe";

import Usuario from "../infra/typeorm/entities/Usuario";
import IUsuariosRepository from "../repositories/IUsuariosRepository";



@injectable()
export default class ListaUsuariosService {
    constructor(
        @inject("UsuariosRepository")
        private usuariosRepository: IUsuariosRepository,
    ) { }

    public async execute(): Promise<Usuario[]> {
        return this.usuariosRepository.findAll();
    }
}
