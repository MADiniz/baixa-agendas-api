/* eslint-disable prettier/prettier */
import IFiliaisRepository from "@modules/filiais/repositories/IFiliaisRepository";
import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import Usuario from "../infra/typeorm/entities/Usuario";
import IHashProvider from "../providers/HashProvider/models/IHashProvider";
import IUsuariosRepository from "../repositories/IUsuariosRepository";

interface IRequest {
    user_id: string;
    nome: string;
    email: string;
    password?: string;
    old_password?: string;
    filial_id?: string
}

@injectable()
export default class UpdatePerfilService {
    constructor(
        @inject("UsuariosRepository")
        private usuariosRepository: IUsuariosRepository,

        @inject("HashProvider")
        private hashProvider: IHashProvider,

        @inject("FiliaisRepository")
        private filiaisRepository: IFiliaisRepository,
    ) { }

    public async execute({
        user_id,
        nome,
        email,
        password,
        old_password,
        filial_id,
    }: IRequest): Promise<Usuario> {
        const usuario = await this.usuariosRepository.findById(user_id);

        if (!usuario) {
            throw new AppError("Usuário não encontrado.");
        }

        const usuarioComEmailAtualizado = await this.usuariosRepository.findByEmail(
            email,
        );

        if (
            usuarioComEmailAtualizado &&
            usuarioComEmailAtualizado.id !== user_id
        ) {
            throw new AppError("E-mail já está em uso.");
        }

        usuario.nome = nome;
        usuario.email = email;

        if (password && !old_password) {
            throw new AppError(
                "É necessário informar o password antigo antes de gerar um novo password.",
            );
        }

        if (password && old_password) {
            const checkOldPassord = await this.hashProvider.compareHash(
                old_password,
                usuario.password,
            );

            if (!checkOldPassord) {
                throw new AppError("Password antigo está incorreto");
            }

            usuario.password = await this.hashProvider.generateHash(password);
        }

        if (filial_id) {
            const filial = await this.filiaisRepository.findById(filial_id);
            if (!filial) {
                throw new AppError("Filial não existente");
            }
            usuario.filial_id = filial.id;
        }

        return this.usuariosRepository.save(usuario);
    }
}
