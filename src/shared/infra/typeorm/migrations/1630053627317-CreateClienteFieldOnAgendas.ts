import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export default class CreateClienteFieldOnAgendas1630053627317
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            "agendas",
            new TableColumn({
                name: "cliente",
                type: "varchar",
                isNullable: true,
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("agendas", "cliente");
    }
}
