import { Type } from "class-transformer";
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

@Entity("agendas")
export default class Agenda {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    nome: string;

    @Column()
    codigoProduto: string;

    @Column()
    quantidadePedida: number;

    @Column()
    filial_id: string;

    @OneToOne(() => Filial)
    @JoinColumn({ name: "filial_id" })
    @Type(() => Filial)
    filial: Filial;

    @Column()
    idsParaUpdate: string;

    @Column()
    status: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
