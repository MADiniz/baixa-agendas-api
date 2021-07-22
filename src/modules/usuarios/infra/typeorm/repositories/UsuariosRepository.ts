import { getRepository, Repository } from "typeorm";
import ICreateUsuarioDTO from "@modules/usuarios/dtos/ICreateUsuarioDTO";
import IUsuariosRepository from "@modules/usuarios/repositories/IUsuariosRepository";
import Usuario from "../entities/Usuario";

export default class UsuariosRepository implements IUsuariosRepository {
    private ormRepository: Repository<Usuario>;

    constructor() {
        this.ormRepository = getRepository(Usuario);
    }

    public async save(usuario: Usuario): Promise<Usuario> {
        return this.ormRepository.save(usuario);
    }

    public async findAll(): Promise<Usuario[]> {
        return this.ormRepository.find();
    }

    public async findByEmail(email: string): Promise<Usuario | undefined> {
        const usuario = await this.ormRepository.findOne({ where: { email } });
        return usuario;
    }

    public async findById(id: string): Promise<Usuario | undefined> {
        const usuario = await this.ormRepository.findOne(id);
        return usuario;
    }

    public async create({
        nome,
        email,
        password,
        filial_id,
    }: ICreateUsuarioDTO): Promise<Usuario> {
        const usuario = this.ormRepository.create({
            nome,
            email,
            password,
            filial_id,
        });

        await this.ormRepository.save(usuario);
        return usuario;
    }
}
