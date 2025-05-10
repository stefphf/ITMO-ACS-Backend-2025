import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableUser1746713583648 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "user" (
                user_id SERIAL PRIMARY KEY,
                first_name TEXT NOT NULL,
                last_name TEXT NOT NULL,
                birth_date DATE NOT NULL,
                phone TEXT NOT NULL UNIQUE,
                email TEXT NOT NULL UNIQUE,
                role TEXT NOT NULL DEFAULT 'tenant',
                password TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                CONSTRAINT check_user_role CHECK (role IN ('tenant', 'landlord', 'admin'))
            );`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE IF EXISTS "user";
        `);
  }
}
