import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("customers").del();

  // Inserts seed entries
  await knex("customers").insert([
    {
      customer_id: 1,
      customer_email: "agung@example.com",
      customer_name: "Agung",
      customer_phone_number: "081234567890",
      username: "agung123",
      password: "password123",
    },
    {
      customer_id: 2,
      customer_email: "rashif@example.com",
      customer_name: "Rashif",
      customer_phone_number: "081234567891",
      username: "rashif123",
      password: "password123",
    },
    {
      customer_id: 3,
      customer_email: "madani@example.com",
      customer_name: "Madani",
      customer_phone_number: "081234567892",
      username: "madani123",
      password: "password123",
    },
  ]);
}
