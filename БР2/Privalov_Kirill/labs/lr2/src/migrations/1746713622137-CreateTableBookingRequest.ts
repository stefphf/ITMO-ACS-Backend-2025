import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableBookingRequest1746713622137
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS booking_request (
        request_id SERIAL PRIMARY KEY,
        tenant_id INTEGER NOT NULL REFERENCES "user"(user_id),
        property_id INTEGER NOT NULL REFERENCES property(property_id),
        requested_start_date DATE NOT NULL,
        requested_end_date DATE NOT NULL,
        status VARCHAR(50) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE IF EXISTS booking_request;
    `);
  }
}
