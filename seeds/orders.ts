import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("orders").del();

  // Insert seed entries
  await knex("orders").insert([
    {
      order_id: 1,
      customer_id: 1, // Agung
      car_id: 1, // Toyota Corolla
      start_rent: new Date().toISOString(),
      finish_rent: new Date(
        new Date().getTime() + 5 * 24 * 60 * 60 * 1000
      ).toISOString(), // 5 days later
      total_price: 200000 * 5, // price per day * number of days
      status: true, // Sample status
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      order_id: 2,
      customer_id: 2, // Rashif
      car_id: 2, // Honda Civic
      start_rent: new Date().toISOString(),
      finish_rent: new Date(
        new Date().getTime() + 7 * 24 * 60 * 60 * 1000
      ).toISOString(), // 7 days later
      total_price: 400000 * 7, // price per day * number of days
      status: true, // Sample status
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      order_id: 3,
      customer_id: 3, // Madani
      car_id: 3, // Ford F-150
      start_rent: new Date().toISOString(),
      finish_rent: new Date(
        new Date().getTime() + 3 * 24 * 60 * 60 * 1000
      ).toISOString(), // 3 days later
      total_price: 3000000 * 3, // price per day * number of days
      status: true, // Sample status
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      order_id: 4,
      customer_id: 1, // Agung
      car_id: 4, // Chevrolet Tahoe
      start_rent: new Date().toISOString(),
      finish_rent: new Date(
        new Date().getTime() + 4 * 24 * 60 * 60 * 1000
      ).toISOString(), // 4 days later
      total_price: 5000000 * 4, // price per day * number of days
      status: true, // Sample status
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      order_id: 5,
      customer_id: 2, // Rashif
      car_id: 5, // Nissan Altima
      start_rent: new Date().toISOString(),
      finish_rent: new Date(
        new Date().getTime() + 6 * 24 * 60 * 60 * 1000
      ).toISOString(), // 6 days later
      total_price: 600000 * 6, // price per day * number of days
      status: true, // Sample status
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      order_id: 6,
      customer_id: 3, // Madani
      car_id: 6, // Hyundai Elantra
      start_rent: new Date().toISOString(),
      finish_rent: new Date(
        new Date().getTime() + 8 * 24 * 60 * 60 * 1000
      ).toISOString(), // 8 days later
      total_price: 700000 * 8, // price per day * number of days
      status: true, // Sample status
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      order_id: 7,
      customer_id: 1, // Agung
      car_id: 7, // BMW 3 Series
      start_rent: new Date().toISOString(),
      finish_rent: new Date(
        new Date().getTime() + 2 * 24 * 60 * 60 * 1000
      ).toISOString(), // 2 days later
      total_price: 1200000 * 2, // price per day * number of days
      status: true, // Sample status
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      order_id: 8,
      customer_id: 2, // Rashif
      car_id: 8, // Audi Q7
      start_rent: new Date().toISOString(),
      finish_rent: new Date(
        new Date().getTime() + 9 * 24 * 60 * 60 * 1000
      ).toISOString(), // 9 days later
      total_price: 18000000 * 9, // price per day * number of days
      status: true, // Sample status
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      order_id: 9,
      customer_id: 3, // Madani
      car_id: 9, // Mercedes-Benz C-Class
      start_rent: new Date().toISOString(),
      finish_rent: new Date(
        new Date().getTime() + 5 * 24 * 60 * 60 * 1000
      ).toISOString(), // 5 days later
      total_price: 1400000 * 5, // price per day * number of days
      status: true, // Sample status
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      order_id: 10,
      customer_id: 1, // Agung
      car_id: 10, // Kia Rio
      start_rent: new Date().toISOString(),
      finish_rent: new Date(
        new Date().getTime() + 7 * 24 * 60 * 60 * 1000
      ).toISOString(), // 7 days later
      total_price: 800000 * 7, // price per day * number of days
      status: true, // Sample status
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ]);
}
