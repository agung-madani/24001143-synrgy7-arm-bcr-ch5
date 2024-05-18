import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("orders", (table) => {
    table.increments("order_id").primary();
    table.integer("customer_id").unsigned().notNullable();
    table.integer("car_id").unsigned().notNullable();
    table.timestamp("start_rent").notNullable();
    table.timestamp("finish_rent").notNullable();
    table.integer("total_price").notNullable();
    table.boolean("status").defaultTo(false);
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("orders");
}
