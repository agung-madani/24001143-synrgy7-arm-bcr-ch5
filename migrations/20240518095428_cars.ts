import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("cars", (table) => {
    table.increments("car_id").primary();
    table.string("car_name").notNullable();
    table.string("car_category").notNullable();
    table.timestamp("start_rent").notNullable();
    table.timestamp("finish_rent").notNullable();
    table.integer("price").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
    table.string("car_image").notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("cars");
}
