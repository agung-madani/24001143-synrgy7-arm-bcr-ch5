import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("cars").del();

  // Insert seed entries
  await knex("cars").insert([
    {
      car_id: 1,
      car_name: "Toyota Corolla",
      car_category: "medium",
      start_rent: new Date().toISOString(),
      finish_rent: new Date(
        new Date().getTime() + 30 * 24 * 60 * 60 * 1000
      ).toISOString(),
      price: 200000,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      car_image: "./public/img/toyota_corolla.jpg",
    },
    {
      car_id: 2,
      car_name: "Honda Civic",
      car_category: "medium",
      start_rent: new Date().toISOString(),
      finish_rent: new Date(
        new Date().getTime() + 234 * 24 * 60 * 60 * 1000
      ).toISOString(),
      price: 400000,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      car_image: "./public/img/honda_civic.jpeg",
    },
    {
      car_id: 3,
      car_name: "Ford F-150",
      car_category: "large",
      start_rent: new Date().toISOString(),
      finish_rent: new Date(
        new Date().getTime() + 14 * 24 * 60 * 60 * 1000
      ).toISOString(),
      price: 3000000,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      car_image: "./public/img/ford_f-150.jpg",
    },
    {
      car_id: 4,
      car_name: "Chevrolet Tahoe",
      car_category: "large",
      start_rent: new Date().toISOString(),
      finish_rent: new Date(
        new Date().getTime() + 89 * 24 * 60 * 60 * 1000
      ).toISOString(),
      price: 5000000,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      car_image: "./public/img/chevrolet_tahoe.jpg",
    },
    {
      car_id: 5,
      car_name: "Nissan Altima",
      car_category: "medium",
      start_rent: new Date().toISOString(),
      finish_rent: new Date(
        new Date().getTime() + 73 * 24 * 60 * 60 * 1000
      ).toISOString(),
      price: 600000,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      car_image: "./public/img/nissan_altima.jpg",
    },
    {
      car_id: 6,
      car_name: "Hyundai Elantra",
      car_category: "small",
      start_rent: new Date().toISOString(),
      finish_rent: new Date(
        new Date().getTime() + 56 * 24 * 60 * 60 * 1000
      ).toISOString(),
      price: 700000,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      car_image: "./public/img/hyundai_elantra.jpg",
    },
    {
      car_id: 7,
      car_name: "BMW 3 Series",
      car_category: "medium",
      start_rent: new Date().toISOString(),
      finish_rent: new Date(
        new Date().getTime() + 36 * 24 * 60 * 60 * 1000
      ).toISOString(),
      price: 1200000,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      car_image: "./public/img/bmw_3_series.jpg",
    },
    {
      car_id: 8,
      car_name: "Audi Q7",
      car_category: "large",
      start_rent: new Date().toISOString(),
      finish_rent: new Date(
        new Date().getTime() + 578 * 24 * 60 * 60 * 1000
      ).toISOString(),
      price: 18000000,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      car_image: "./public/img/audi_q7.jpeg",
    },
    {
      car_id: 9,
      car_name: "Mercedes-Benz C-Class",
      car_category: "medium",
      start_rent: new Date().toISOString(),
      finish_rent: new Date(
        new Date().getTime() + 32 * 24 * 60 * 60 * 1000
      ).toISOString(),
      price: 1400000,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      car_image: "./public/img/mercedes-benz_c-class.jpeg",
    },
    {
      car_id: 10,
      car_name: "Kia Rio",
      car_category: "small",
      start_rent: new Date().toISOString(),
      finish_rent: new Date(
        new Date().getTime() + 53 * 24 * 60 * 60 * 1000
      ).toISOString(),
      price: 800000,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      car_image: "./public/img/kia_rio.jpg",
    },
    {
      car_id: 11,
      car_name: "Volkswagen Jetta",
      car_category: "medium",
      start_rent: new Date().toISOString(),
      finish_rent: new Date(
        new Date().getTime() + 16 * 24 * 60 * 60 * 1000
      ).toISOString(),
      price: 900000,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      car_image: "./public/img/volkswagen_jetta.jpg",
    },
    {
      car_id: 12,
      car_name: "Subaru Outback",
      car_category: "large",
      start_rent: new Date().toISOString(),
      finish_rent: new Date(
        new Date().getTime() + 235 * 24 * 60 * 60 * 1000
      ).toISOString(),
      price: 2500000,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      car_image: "./public/img/subaru_outback.jpg",
    },
    {
      car_id: 13,
      car_name: "Mazda 3",
      car_category: "small",
      start_rent: new Date().toISOString(),
      finish_rent: new Date(
        new Date().getTime() + 124 * 24 * 60 * 60 * 1000
      ).toISOString(),
      price: 1000000,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      car_image: "./public/img/mazda_3.jpg",
    },
    {
      car_id: 14,
      car_name: "Jeep Grand Cherokee",
      car_category: "large",
      start_rent: new Date().toISOString(),
      finish_rent: new Date(
        new Date().getTime() + 152 * 24 * 60 * 60 * 1000
      ).toISOString(),
      price: 20000000,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      car_image: "./public/img/jeep_grand_cherokee.jpg",
    },
    {
      car_id: 15,
      car_name: "Honda Fit",
      car_category: "small",
      start_rent: new Date().toISOString(),
      finish_rent: new Date(
        new Date().getTime() + 83 * 24 * 60 * 60 * 1000
      ).toISOString(),
      price: 1100000,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      car_image: "./public/img/honda_fit.webp",
    },
    {
      car_id: 16,
      car_name: "Toyota RAV4",
      car_category: "medium",
      start_rent: new Date().toISOString(),
      finish_rent: new Date(
        new Date().getTime() + 69 * 24 * 60 * 60 * 1000
      ).toISOString(),
      price: 1500000,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      car_image: "./public/img/toyota_rav4.jpeg",
    },
    {
      car_id: 17,
      car_name: "Ford Escape",
      car_category: "medium",
      start_rent: new Date().toISOString(),
      finish_rent: new Date(
        new Date().getTime() + 63 * 24 * 60 * 60 * 1000
      ).toISOString(),
      price: 1600000,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      car_image: "./public/img/ford_escape.jpeg",
    },
    {
      car_id: 18,
      car_name: "Chevrolet Silverado",
      car_category: "large",
      start_rent: new Date().toISOString(),
      finish_rent: new Date(
        new Date().getTime() + 45 * 24 * 60 * 60 * 1000
      ).toISOString(),
      price: 19000000,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      car_image: "./public/img/chevrolet_silverado.jpeg",
    },
    {
      car_id: 19,
      car_name: "Hyundai Sonata",
      car_category: "medium",
      start_rent: new Date().toISOString(),
      finish_rent: new Date(
        new Date().getTime() + 83 * 24 * 60 * 60 * 1000
      ).toISOString(),
      price: 1700000,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      car_image: "./public/img/honda_civic.jpeg",
    },
    {
      car_id: 20,
      car_name: "Nissan Rogue",
      car_category: "medium",
      start_rent: new Date().toISOString(),
      finish_rent: new Date(
        new Date().getTime() + 56 * 24 * 60 * 60 * 1000
      ).toISOString(),
      price: 1800000,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      car_image: "./public/img/toyota_corolla.jpg",
    },
  ]);
}
