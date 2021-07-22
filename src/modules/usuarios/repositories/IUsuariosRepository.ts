import ICreateUsuarioDTO from "../dtos/ICreateUsuarioDTO";
import Usuario from "../infra/typeorm/entities/Usuario";

export default interface IUsuariosRepository {
    findByEmail(email: string): Promise<Usuario | undefined>;
    findById(id: string): Promise<Usuario | undefined>;
    create(data: ICreateUsuarioDTO): Promise<Usuario>;
    findAll(): Promise<Usuario[]>;
    save(data: Usuario): Promise<Usuario>;
}
