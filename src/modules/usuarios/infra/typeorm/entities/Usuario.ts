import { Exclude, Type } from "class-transformer";
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    JoinColumn,
    OneToOne,
} from "typeorm";

import Filial from "@modules/filiais/infra/typeorm/entities/Filial";

@Entity("usuarios")
class Usuario {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    nome: string;

    @Column()
    email: string;

    @Column()
    @Exclude()
    password: string;

    @Column()
    @Exclude()
    filial_id: string;

    @OneToOne(() => Filial)
    @JoinColumn({ name: "filial_id" })
    @Type(() => Filial)
    filial: Filial;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default Usuario;
