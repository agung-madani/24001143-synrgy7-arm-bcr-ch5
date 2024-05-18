import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("customers", (table) => {
    table.increments("customer_id").primary();
    table.string("customer_email").notNullable();
    table.string("customer_name").notNullable();
    table.string("customer_phone_number").notNullable();
    table.string("username").notNullable();
    table.string("password").notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("customers");
}
