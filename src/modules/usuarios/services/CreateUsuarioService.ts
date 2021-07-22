/* eslint-disable prettier/prettier */
import { injectable, inject } from "tsyringe";



import AppError from "@shared/errors/AppError";
import Usuario from "../infra/typeorm/entities/Usuario";
import IUsuariosRepository from "../repositories/IUsuariosRepository";
import IHashProvider from "../providers/HashProvider/models/IHashProvider";

interface IRequest {
    nome: string;
    email: string;
    password: string;
    filial_id: string;
}

@injectable()
export default class CreateUsuarioService {
    constructor(
        @inject("UsuariosRepository")
        private usuariosRepository: IUsuariosRepository,
        @inject("HashProvider")
        private hashProvider: IHashProvider,
    ) { }

    public async execute({
        nome,
        email,
        password,
        filial_id,
    }: IRequest): Promise<Usuario> {
        const checkUsuarioExists = await this.usuariosRepository.findByEmail(
            email,
        );

        if (checkUsuarioExists) {
            throw new AppError("Usuário existente");
        }

        const hashedSenha = await this.hashProvider.generateHash(password);

        const usuario = await this.usuariosRepository.create({
            nome,
            email,
            password: hashedSenha,
            filial_id,
        });

        return usuario;
    }
}
