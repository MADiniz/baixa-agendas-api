import { MigrationInterface, QueryRunner, Table } from "typeorm";

export default class CreateAgendas1624197196658 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "agendas",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                        generationStrategy: "uuid",
                        default: "uuid_generate_v4()",
                    },
                    {
                        name: "nome",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "codigoProduto",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "quantidadePedida",
                        type: "int",
                        isNullable: true,
                    },
                    {
                        name: "filial_id",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "idsParaUpdate",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "status",
                        type: "int",
                        isNullable: true,
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()",
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "now()",
                    },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("agendas");
    }
}
