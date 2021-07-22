import { uuid } from "uuidv4";
import ICreateUsuarioDTO from "@modules/usuarios/dtos/ICreateUsuarioDTO";
import IUsuariosRepository from "@modules/usuarios/repositories/IUsuariosRepository";
import Usuario from "@modules/usuarios/infra/typeorm/entities/Usuario";

export default class FakeUsuariosRepository implements IUsuariosRepository {
    private usuarios: Usuario[] = [];

    public async save(usuario: Usuario): Promise<Usuario> {
        this.usuarios.push(usuario);
        return usuario;
    }

    public async findAll(): Promise<Usuario[]> {
        return this.usuarios;
    }

    public async findByEmail(email: string): Promise<Usuario | undefined> {
        const findUsuario = this.usuarios.find(
            usuario => usuario.email === email,
        );
        return findUsuario;
    }

    public async findById(id: string): Promise<Usuario | undefined> {
        const findUsuario = this.usuarios.find(usuario => usuario.id === id);
        return findUsuario;
    }

    public async create({
        nome,
        email,
        password,
        filial_id,
    }: ICreateUsuarioDTO): Promise<Usuario> {
        const usuario = new Usuario();
        Object.assign(usuario, {
            id: uuid(),
            nome,
            email,
            password,
            filial_id,
        });

        await this.usuarios.push(usuario);
        return usuario;
    }
}
