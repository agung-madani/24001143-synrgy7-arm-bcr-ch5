# Car Management Dashboard

This is a Car Rental Service application built with TypeScript, Express, Knex, and Objection. It provides a RESTful API for managing cars, customers, and orders, along with file upload functionality for car images.

## Table of Contents

- [Installation](#installation)
- [ERD (Entity-Relationship Diagram)](#erd-entity-relationship-diagram)
- [Database Setup](#database-setup)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Folder Structure](#folder-structure)
- [Technologies Used](#technologies-used)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/agung-madani/24001143-synrgy7-arm-bcr-ch5.git
   cd 24001143-synrgy7-arm-bcr-ch5
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

## ERD (Entity-Relationship Diagram)

![ERD_bcr](https://github.com/agung-madani/24001143-synrgy7-arm-bcr-ch5/assets/121701309/349b7f87-806e-4285-b60e-e04e7864fc29)

The ERD illustrates the relationships between the tables in the Car Management Dashboard database:

- **customers**: Contains customer information such as email, name, phone number, username, and password.
  - `customer_id`: Primary key.
  - `customer_email`, `customer_name`, `customer_phone_number`, `username`, `password`: Customer details.

- **cars**: Stores information about the cars available for rent.
  - `car_id`: Primary key.
  - `car_name`, `car_category`, `start_rent`, `finish_rent`, `price`, `created_at`, `updated_at`, `car_image`: Car details.

- **orders**: Represents the orders placed by customers for renting cars.
  - `order_id`: Primary key.
  - `customer_id`: Foreign key referencing `customers.customer_id`.
  - `car_id`: Foreign key referencing `cars.car_id`.
  - `start_rent`, `finish_rent`, `total_price`, `status`, `created_at`, `updated_at`: Order details.

The relationships are defined as follows:
- An `customer` one-to-many `order`  (`orders.customer_id` > `customers.customer_id`).
- An `car` one-to-many `order` (`orders.car_id` > `cars.car_id`).

## Database Setup

1. Create a PostgreSQL database named `bcr` (or update the `knexfile.ts` and knexInstance inside `index.ts` with your database configuration).

2. Run the migrations to set up the database schema:
   ```bash
   npx knex migrate:latest
   ```

3. (Optional) Seed the database with initial data:
   ```bash
   npx knex seed:run
   ```

## Running the Application

1. Start the server:
   ```bash
   npm start
   ```

2. The application will be running at `http://localhost:3000`.

## API Endpoints

### Cars

- **Create a car**
  - `POST /cars`
  - Body: `car_name`, `car_category`, `start_rent`, `finish_rent`, `price`, `car_image`
  - POSTMAN Test:

![image](https://github.com/agung-madani/24001143-synrgy7-arm-bcr-ch5/assets/121701309/7ca1c6ba-95bc-4651-9730-dd342f92bbf4)

```json
{
    "message": "Car created successfully",
    "data": {
        "car_id": 21,
        "car_name": "Toyota Camry",
        "car_category": "medium",
        "start_rent": "2024-05-18T13:37:26.354Z",
        "finish_rent": "2024-06-17T13:37:26.359Z",
        "price": 800000,
        "created_at": "2024-05-18T13:37:26.359Z",
        "updated_at": "2024-05-18T13:37:26.359Z",
        "car_image": "./public/img/toyota_camry.jpg",
        "order": []
    }
}
```

The car image file will be uploaded to local `public/img`

![image](https://github.com/agung-madani/24001143-synrgy7-arm-bcr-ch5/assets/121701309/a7416239-4cde-4a22-b4a6-f3ba9f4ebd14)

- **Get all cars**
  - `GET /cars`
  - POSTMAN Test:

```json
{
    "message": "Read Successfully",
    "data": [
        {
            "car_id": 10,
            "car_name": "Kia Rio",
            "car_category": "small",
            "start_rent": "2024-05-18T13:12:17.020Z",
            "finish_rent": "2024-07-10T13:12:17.020Z",
            "price": 800000,
            "created_at": "2024-05-18T13:12:17.020Z",
            "updated_at": "2024-05-18T13:12:17.020Z",
            "car_image": "./public/img/kia_rio.jpg",
            "order": [
                {
                    "order_id": 10,
                    "customer_id": 1,
                    "car_id": 10,
                    "start_rent": "2024-05-18T13:12:17.035Z",
                    "finish_rent": "2024-05-25T13:12:17.035Z",
                    "total_price": 5600000,
                    "status": true,
                    "created_at": "2024-05-18T13:12:17.035Z",
                    "updated_at": "2024-05-18T13:12:17.035Z"
                }
            ]
        },
        {
            "car_id": 11,
            "car_name": "Volkswagen Jetta",
            "car_category": "medium",
            "start_rent": "2024-05-18T13:12:17.020Z",
            "finish_rent": "2024-06-03T13:12:17.020Z",
            "price": 900000,
            "created_at": "2024-05-18T13:12:17.020Z",
            "updated_at": "2024-05-18T13:12:17.020Z",
            "car_image": "./public/img/volkswagen_jetta.jpg",
            "order": []
        },
        {
            "car_id": 12,
            "car_name": "Subaru Outback",
            "car_category": "large",
            "start_rent": "2024-05-18T13:12:17.020Z",
            "finish_rent": "2025-01-08T13:12:17.020Z",
            "price": 2500000,
            "created_at": "2024-05-18T13:12:17.020Z",
            "updated_at": "2024-05-18T13:12:17.020Z",
            "car_image": "./public/img/subaru_outback.jpg",
            "order": []
        },
        {
            "car_id": 13,
            "car_name": "Mazda 3",
            "car_category": "small",
            "start_rent": "2024-05-18T13:12:17.020Z",
            "finish_rent": "2024-09-19T13:12:17.020Z",
            "price": 1000000,
            "created_at": "2024-05-18T13:12:17.020Z",
            "updated_at": "2024-05-18T13:12:17.020Z",
            "car_image": "./public/img/mazda_3.jpg",
            "order": []
        },
        {
            "car_id": 14,
            "car_name": "Jeep Grand Cherokee",
            "car_category": "large",
            "start_rent": "2024-05-18T13:12:17.020Z",
            "finish_rent": "2024-10-17T13:12:17.020Z",
            "price": 20000000,
            "created_at": "2024-05-18T13:12:17.020Z",
            "updated_at": "2024-05-18T13:12:17.020Z",
            "car_image": "./public/img/jeep_grand_cherokee.jpg",
            "order": []
        },
        {
            "car_id": 1,
            "car_name": "Toyota Corolla",
            "car_category": "medium",
            "start_rent": "2024-05-18T13:12:17.019Z",
            "finish_rent": "2024-06-17T13:12:17.020Z",
            "price": 200000,
            "created_at": "2024-05-18T13:12:17.020Z",
            "updated_at": "2024-05-18T13:12:17.020Z",
            "car_image": "./public/img/toyota_corolla.jpg",
            "order": [
                {
                    "order_id": 1,
                    "customer_id": 1,
                    "car_id": 1,
                    "start_rent": "2024-05-18T13:12:17.035Z",
                    "finish_rent": "2024-05-23T13:12:17.035Z",
                    "total_price": 1000000,
                    "status": true,
                    "created_at": "2024-05-18T13:12:17.035Z",
                    "updated_at": "2024-05-18T13:12:17.035Z"
                }
            ]
        },
        {
            "car_id": 2,
            "car_name": "Honda Civic",
            "car_category": "medium",
            "start_rent": "2024-05-18T13:12:17.020Z",
            "finish_rent": "2025-01-07T13:12:17.020Z",
            "price": 400000,
            "created_at": "2024-05-18T13:12:17.020Z",
            "updated_at": "2024-05-18T13:12:17.020Z",
            "car_image": "./public/img/honda_civic.jpeg",
            "order": [
                {
                    "order_id": 2,
                    "customer_id": 2,
                    "car_id": 2,
                    "start_rent": "2024-05-18T13:12:17.035Z",
                    "finish_rent": "2024-05-25T13:12:17.035Z",
                    "total_price": 2800000,
                    "status": true,
                    "created_at": "2024-05-18T13:12:17.035Z",
                    "updated_at": "2024-05-18T13:12:17.035Z"
                }
            ]
        },
        {
            "car_id": 3,
            "car_name": "Ford F-150",
            "car_category": "large",
            "start_rent": "2024-05-18T13:12:17.020Z",
            "finish_rent": "2024-06-01T13:12:17.020Z",
            "price": 3000000,
            "created_at": "2024-05-18T13:12:17.020Z",
            "updated_at": "2024-05-18T13:12:17.020Z",
            "car_image": "./public/img/ford_f-150.jpg",
            "order": [
                {
                    "order_id": 3,
                    "customer_id": 3,
                    "car_id": 3,
                    "start_rent": "2024-05-18T13:12:17.035Z",
                    "finish_rent": "2024-05-21T13:12:17.035Z",
                    "total_price": 9000000,
                    "status": true,
                    "created_at": "2024-05-18T13:12:17.035Z",
                    "updated_at": "2024-05-18T13:12:17.035Z"
                }
            ]
        },
        {
            "car_id": 4,
            "car_name": "Chevrolet Tahoe",
            "car_category": "large",
            "start_rent": "2024-05-18T13:12:17.020Z",
            "finish_rent": "2024-08-15T13:12:17.020Z",
            "price": 5000000,
            "created_at": "2024-05-18T13:12:17.020Z",
            "updated_at": "2024-05-18T13:12:17.020Z",
            "car_image": "./public/img/chevrolet_tahoe.jpg",
            "order": [
                {
                    "order_id": 4,
                    "customer_id": 1,
                    "car_id": 4,
                    "start_rent": "2024-05-18T13:12:17.035Z",
                    "finish_rent": "2024-05-22T13:12:17.035Z",
                    "total_price": 20000000,
                    "status": true,
                    "created_at": "2024-05-18T13:12:17.035Z",
                    "updated_at": "2024-05-18T13:12:17.035Z"
                }
            ]
        },
        {
            "car_id": 5,
            "car_name": "Nissan Altima",
            "car_category": "medium",
            "start_rent": "2024-05-18T13:12:17.020Z",
            "finish_rent": "2024-07-30T13:12:17.020Z",
            "price": 600000,
            "created_at": "2024-05-18T13:12:17.020Z",
            "updated_at": "2024-05-18T13:12:17.020Z",
            "car_image": "./public/img/nissan_altima.jpg",
            "order": [
                {
                    "order_id": 5,
                    "customer_id": 2,
                    "car_id": 5,
                    "start_rent": "2024-05-18T13:12:17.035Z",
                    "finish_rent": "2024-05-24T13:12:17.035Z",
                    "total_price": 3600000,
                    "status": true,
                    "created_at": "2024-05-18T13:12:17.035Z",
                    "updated_at": "2024-05-18T13:12:17.035Z"
                }
            ]
        },
        {
            "car_id": 6,
            "car_name": "Hyundai Elantra",
            "car_category": "small",
            "start_rent": "2024-05-18T13:12:17.020Z",
            "finish_rent": "2024-07-13T13:12:17.020Z",
            "price": 700000,
            "created_at": "2024-05-18T13:12:17.020Z",
            "updated_at": "2024-05-18T13:12:17.020Z",
            "car_image": "./public/img/hyundai_elantra.jpg",
            "order": [
                {
                    "order_id": 6,
                    "customer_id": 3,
                    "car_id": 6,
                    "start_rent": "2024-05-18T13:12:17.035Z",
                    "finish_rent": "2024-05-26T13:12:17.035Z",
                    "total_price": 5600000,
                    "status": true,
                    "created_at": "2024-05-18T13:12:17.035Z",
                    "updated_at": "2024-05-18T13:12:17.035Z"
                }
            ]
        },
        {
            "car_id": 7,
            "car_name": "BMW 3 Series",
            "car_category": "medium",
            "start_rent": "2024-05-18T13:12:17.020Z",
            "finish_rent": "2024-06-23T13:12:17.020Z",
            "price": 1200000,
            "created_at": "2024-05-18T13:12:17.020Z",
            "updated_at": "2024-05-18T13:12:17.020Z",
            "car_image": "./public/img/bmw_3_series.jpg",
            "order": [
                {
                    "order_id": 7,
                    "customer_id": 1,
                    "car_id": 7,
                    "start_rent": "2024-05-18T13:12:17.035Z",
                    "finish_rent": "2024-05-20T13:12:17.035Z",
                    "total_price": 2400000,
                    "status": true,
                    "created_at": "2024-05-18T13:12:17.035Z",
                    "updated_at": "2024-05-18T13:12:17.035Z"
                }
            ]
        },
        {
            "car_id": 8,
            "car_name": "Audi Q7",
            "car_category": "large",
            "start_rent": "2024-05-18T13:12:17.020Z",
            "finish_rent": "2025-12-17T13:12:17.020Z",
            "price": 18000000,
            "created_at": "2024-05-18T13:12:17.020Z",
            "updated_at": "2024-05-18T13:12:17.020Z",
            "car_image": "./public/img/audi_q7.jpeg",
            "order": [
                {
                    "order_id": 8,
                    "customer_id": 2,
                    "car_id": 8,
                    "start_rent": "2024-05-18T13:12:17.035Z",
                    "finish_rent": "2024-05-27T13:12:17.035Z",
                    "total_price": 162000000,
                    "status": true,
                    "created_at": "2024-05-18T13:12:17.035Z",
                    "updated_at": "2024-05-18T13:12:17.035Z"
                }
            ]
        },
        {
            "car_id": 9,
            "car_name": "Mercedes-Benz C-Class",
            "car_category": "medium",
            "start_rent": "2024-05-18T13:12:17.020Z",
            "finish_rent": "2024-06-19T13:12:17.020Z",
            "price": 1400000,
            "created_at": "2024-05-18T13:12:17.020Z",
            "updated_at": "2024-05-18T13:12:17.020Z",
            "car_image": "./public/img/mercedes-benz_c-class.jpeg",
            "order": [
                {
                    "order_id": 9,
                    "customer_id": 3,
                    "car_id": 9,
                    "start_rent": "2024-05-18T13:12:17.035Z",
                    "finish_rent": "2024-05-23T13:12:17.035Z",
                    "total_price": 7000000,
                    "status": true,
                    "created_at": "2024-05-18T13:12:17.035Z",
                    "updated_at": "2024-05-18T13:12:17.035Z"
                }
            ]
        },
        {
            "car_id": 15,
            "car_name": "Honda Fit",
            "car_category": "small",
            "start_rent": "2024-05-18T13:12:17.020Z",
            "finish_rent": "2024-08-09T13:12:17.021Z",
            "price": 1100000,
            "created_at": "2024-05-18T13:12:17.021Z",
            "updated_at": "2024-05-18T13:12:17.021Z",
            "car_image": "./public/img/honda_fit.webp",
            "order": []
        },
        {
            "car_id": 16,
            "car_name": "Toyota RAV4",
            "car_category": "medium",
            "start_rent": "2024-05-18T13:12:17.021Z",
            "finish_rent": "2024-07-26T13:12:17.021Z",
            "price": 1500000,
            "created_at": "2024-05-18T13:12:17.021Z",
            "updated_at": "2024-05-18T13:12:17.021Z",
            "car_image": "./public/img/toyota_rav4.jpeg",
            "order": []
        },
        {
            "car_id": 17,
            "car_name": "Ford Escape",
            "car_category": "medium",
            "start_rent": "2024-05-18T13:12:17.021Z",
            "finish_rent": "2024-07-20T13:12:17.021Z",
            "price": 1600000,
            "created_at": "2024-05-18T13:12:17.021Z",
            "updated_at": "2024-05-18T13:12:17.021Z",
            "car_image": "./public/img/ford_escape.jpeg",
            "order": []
        },
        {
            "car_id": 18,
            "car_name": "Chevrolet Silverado",
            "car_category": "large",
            "start_rent": "2024-05-18T13:12:17.021Z",
            "finish_rent": "2024-07-02T13:12:17.021Z",
            "price": 19000000,
            "created_at": "2024-05-18T13:12:17.021Z",
            "updated_at": "2024-05-18T13:12:17.021Z",
            "car_image": "./public/img/chevrolet_silverado.jpeg",
            "order": []
        },
        {
            "car_id": 19,
            "car_name": "Hyundai Sonata",
            "car_category": "medium",
            "start_rent": "2024-05-18T13:12:17.021Z",
            "finish_rent": "2024-08-09T13:12:17.021Z",
            "price": 1700000,
            "created_at": "2024-05-18T13:12:17.021Z",
            "updated_at": "2024-05-18T13:12:17.021Z",
            "car_image": "./public/img/honda_civic.jpeg",
            "order": []
        },
        {
            "car_id": 20,
            "car_name": "Nissan Rogue",
            "car_category": "medium",
            "start_rent": "2024-05-18T13:12:17.021Z",
            "finish_rent": "2024-07-13T13:12:17.021Z",
            "price": 1800000,
            "created_at": "2024-05-18T13:12:17.021Z",
            "updated_at": "2024-05-18T13:12:17.021Z",
            "car_image": "./public/img/toyota_corolla.jpg",
            "order": []
        },
        {
            "car_id": 21,
            "car_name": "Toyota Camry",
            "car_category": "medium",
            "start_rent": "2024-05-18T13:18:28.639Z",
            "finish_rent": "2024-06-17T13:18:28.641Z",
            "price": 800000,
            "created_at": "2024-05-18T13:18:28.641Z",
            "updated_at": "2024-05-18T13:18:28.641Z",
            "car_image": "./public/img/toyota_camry.jpg",
            "order": []
        }
    ]
}
```
- **Get a car by ID**
  - `GET /cars/:id`
  - POSTMAN Test: `GET /cars/21`

```json
{
    "message": "Read Successfully",
    "data": {
        "car_id": 21,
        "car_name": "Toyota Camry",
        "car_category": "medium",
        "start_rent": "2024-05-18T13:18:28.639Z",
        "finish_rent": "2024-06-17T13:18:28.641Z",
        "price": 800000,
        "created_at": "2024-05-18T13:24:22.033Z",
        "updated_at": "2024-05-18T13:18:28.641Z",
        "car_image": "./public/img/toyota_camry.jpg",
        "order": []
    }
}
```

- **Update a car by ID**
  - `PUT /cars/:id`
  - Body: `car_name`, `car_category`, `start_rent`, `finish_rent`, `price`, `car_image`
  - POSTMAN Test: `PUT /cars/21`

![image](https://github.com/agung-madani/24001143-synrgy7-arm-bcr-ch5/assets/121701309/24e014cd-aedc-426f-a1d8-1c9aaa3c0d7d)

```json
{
    "message": "Car updated successfully",
    "data": {
        "car_id": 21,
        "car_name": "Toyota Camry UHUY",
        "car_category": "large",
        "start_rent": "2024-05-18T13:26:29.205Z",
        "finish_rent": "2027-02-12T13:26:29.205Z",
        "price": 91232000,
        "created_at": "2024-05-18T13:24:22.033Z",
        "updated_at": "2024-05-18T13:26:29.205Z",
        "car_image": "/img/random.jpeg",
        "order": []
    }
}
```

The car image file will be automatically replaced with the new one

![image](https://github.com/agung-madani/24001143-synrgy7-arm-bcr-ch5/assets/121701309/e28ef6c9-a50b-4f55-ba22-c430248e54aa)

- **Delete a car by ID**
  - `DELETE /cars/:id`
  - POSTMAN Test: `DELETE /cars/21`

```json
{
    "message": "Car deleted successfully!",
    "data": [
        {
            "car_id": 10,
            "car_name": "Kia Rio",
            "car_category": "small",
            "start_rent": "2024-05-18T13:12:17.020Z",
            "finish_rent": "2024-07-10T13:12:17.020Z",
            "price": 800000,
            "created_at": "2024-05-18T13:12:17.020Z",
            "updated_at": "2024-05-18T13:12:17.020Z",
            "car_image": "./public/img/kia_rio.jpg",
            "order": [
                {
                    "order_id": 10,
                    "customer_id": 1,
                    "car_id": 10,
                    "start_rent": "2024-05-18T13:12:17.035Z",
                    "finish_rent": "2024-05-25T13:12:17.035Z",
                    "total_price": 5600000,
                    "status": true,
                    "created_at": "2024-05-18T13:12:17.035Z",
                    "updated_at": "2024-05-18T13:12:17.035Z"
                }
            ]
        },
        {
            "car_id": 11,
            "car_name": "Volkswagen Jetta",
            "car_category": "medium",
            "start_rent": "2024-05-18T13:12:17.020Z",
            "finish_rent": "2024-06-03T13:12:17.020Z",
            "price": 900000,
            "created_at": "2024-05-18T13:12:17.020Z",
            "updated_at": "2024-05-18T13:12:17.020Z",
            "car_image": "./public/img/volkswagen_jetta.jpg",
            "order": []
        },
        {
            "car_id": 12,
            "car_name": "Subaru Outback",
            "car_category": "large",
            "start_rent": "2024-05-18T13:12:17.020Z",
            "finish_rent": "2025-01-08T13:12:17.020Z",
            "price": 2500000,
            "created_at": "2024-05-18T13:12:17.020Z",
            "updated_at": "2024-05-18T13:12:17.020Z",
            "car_image": "./public/img/subaru_outback.jpg",
            "order": []
        },
        {
            "car_id": 13,
            "car_name": "Mazda 3",
            "car_category": "small",
            "start_rent": "2024-05-18T13:12:17.020Z",
            "finish_rent": "2024-09-19T13:12:17.020Z",
            "price": 1000000,
            "created_at": "2024-05-18T13:12:17.020Z",
            "updated_at": "2024-05-18T13:12:17.020Z",
            "car_image": "./public/img/mazda_3.jpg",
            "order": []
        },
        {
            "car_id": 14,
            "car_name": "Jeep Grand Cherokee",
            "car_category": "large",
            "start_rent": "2024-05-18T13:12:17.020Z",
            "finish_rent": "2024-10-17T13:12:17.020Z",
            "price": 20000000,
            "created_at": "2024-05-18T13:12:17.020Z",
            "updated_at": "2024-05-18T13:12:17.020Z",
            "car_image": "./public/img/jeep_grand_cherokee.jpg",
            "order": []
        },
        {
            "car_id": 1,
            "car_name": "Toyota Corolla",
            "car_category": "medium",
            "start_rent": "2024-05-18T13:12:17.019Z",
            "finish_rent": "2024-06-17T13:12:17.020Z",
            "price": 200000,
            "created_at": "2024-05-18T13:12:17.020Z",
            "updated_at": "2024-05-18T13:12:17.020Z",
            "car_image": "./public/img/toyota_corolla.jpg",
            "order": [
                {
                    "order_id": 1,
                    "customer_id": 1,
                    "car_id": 1,
                    "start_rent": "2024-05-18T13:12:17.035Z",
                    "finish_rent": "2024-05-23T13:12:17.035Z",
                    "total_price": 1000000,
                    "status": true,
                    "created_at": "2024-05-18T13:12:17.035Z",
                    "updated_at": "2024-05-18T13:12:17.035Z"
                }
            ]
        },
        {
            "car_id": 2,
            "car_name": "Honda Civic",
            "car_category": "medium",
            "start_rent": "2024-05-18T13:12:17.020Z",
            "finish_rent": "2025-01-07T13:12:17.020Z",
            "price": 400000,
            "created_at": "2024-05-18T13:12:17.020Z",
            "updated_at": "2024-05-18T13:12:17.020Z",
            "car_image": "./public/img/honda_civic.jpeg",
            "order": [
                {
                    "order_id": 2,
                    "customer_id": 2,
                    "car_id": 2,
                    "start_rent": "2024-05-18T13:12:17.035Z",
                    "finish_rent": "2024-05-25T13:12:17.035Z",
                    "total_price": 2800000,
                    "status": true,
                    "created_at": "2024-05-18T13:12:17.035Z",
                    "updated_at": "2024-05-18T13:12:17.035Z"
                }
            ]
        },
        {
            "car_id": 3,
            "car_name": "Ford F-150",
            "car_category": "large",
            "start_rent": "2024-05-18T13:12:17.020Z",
            "finish_rent": "2024-06-01T13:12:17.020Z",
            "price": 3000000,
            "created_at": "2024-05-18T13:12:17.020Z",
            "updated_at": "2024-05-18T13:12:17.020Z",
            "car_image": "./public/img/ford_f-150.jpg",
            "order": [
                {
                    "order_id": 3,
                    "customer_id": 3,
                    "car_id": 3,
                    "start_rent": "2024-05-18T13:12:17.035Z",
                    "finish_rent": "2024-05-21T13:12:17.035Z",
                    "total_price": 9000000,
                    "status": true,
                    "created_at": "2024-05-18T13:12:17.035Z",
                    "updated_at": "2024-05-18T13:12:17.035Z"
                }
            ]
        },
        {
            "car_id": 4,
            "car_name": "Chevrolet Tahoe",
            "car_category": "large",
            "start_rent": "2024-05-18T13:12:17.020Z",
            "finish_rent": "2024-08-15T13:12:17.020Z",
            "price": 5000000,
            "created_at": "2024-05-18T13:12:17.020Z",
            "updated_at": "2024-05-18T13:12:17.020Z",
            "car_image": "./public/img/chevrolet_tahoe.jpg",
            "order": [
                {
                    "order_id": 4,
                    "customer_id": 1,
                    "car_id": 4,
                    "start_rent": "2024-05-18T13:12:17.035Z",
                    "finish_rent": "2024-05-22T13:12:17.035Z",
                    "total_price": 20000000,
                    "status": true,
                    "created_at": "2024-05-18T13:12:17.035Z",
                    "updated_at": "2024-05-18T13:12:17.035Z"
                }
            ]
        },
        {
            "car_id": 5,
            "car_name": "Nissan Altima",
            "car_category": "medium",
            "start_rent": "2024-05-18T13:12:17.020Z",
            "finish_rent": "2024-07-30T13:12:17.020Z",
            "price": 600000,
            "created_at": "2024-05-18T13:12:17.020Z",
            "updated_at": "2024-05-18T13:12:17.020Z",
            "car_image": "./public/img/nissan_altima.jpg",
            "order": [
                {
                    "order_id": 5,
                    "customer_id": 2,
                    "car_id": 5,
                    "start_rent": "2024-05-18T13:12:17.035Z",
                    "finish_rent": "2024-05-24T13:12:17.035Z",
                    "total_price": 3600000,
                    "status": true,
                    "created_at": "2024-05-18T13:12:17.035Z",
                    "updated_at": "2024-05-18T13:12:17.035Z"
                }
            ]
        },
        {
            "car_id": 6,
            "car_name": "Hyundai Elantra",
            "car_category": "small",
            "start_rent": "2024-05-18T13:12:17.020Z",
            "finish_rent": "2024-07-13T13:12:17.020Z",
            "price": 700000,
            "created_at": "2024-05-18T13:12:17.020Z",
            "updated_at": "2024-05-18T13:12:17.020Z",
            "car_image": "./public/img/hyundai_elantra.jpg",
            "order": [
                {
                    "order_id": 6,
                    "customer_id": 3,
                    "car_id": 6,
                    "start_rent": "2024-05-18T13:12:17.035Z",
                    "finish_rent": "2024-05-26T13:12:17.035Z",
                    "total_price": 5600000,
                    "status": true,
                    "created_at": "2024-05-18T13:12:17.035Z",
                    "updated_at": "2024-05-18T13:12:17.035Z"
                }
            ]
        },
        {
            "car_id": 7,
            "car_name": "BMW 3 Series",
            "car_category": "medium",
            "start_rent": "2024-05-18T13:12:17.020Z",
            "finish_rent": "2024-06-23T13:12:17.020Z",
            "price": 1200000,
            "created_at": "2024-05-18T13:12:17.020Z",
            "updated_at": "2024-05-18T13:12:17.020Z",
            "car_image": "./public/img/bmw_3_series.jpg",
            "order": [
                {
                    "order_id": 7,
                    "customer_id": 1,
                    "car_id": 7,
                    "start_rent": "2024-05-18T13:12:17.035Z",
                    "finish_rent": "2024-05-20T13:12:17.035Z",
                    "total_price": 2400000,
                    "status": true,
                    "created_at": "2024-05-18T13:12:17.035Z",
                    "updated_at": "2024-05-18T13:12:17.035Z"
                }
            ]
        },
        {
            "car_id": 8,
            "car_name": "Audi Q7",
            "car_category": "large",
            "start_rent": "2024-05-18T13:12:17.020Z",
            "finish_rent": "2025-12-17T13:12:17.020Z",
            "price": 18000000,
            "created_at": "2024-05-18T13:12:17.020Z",
            "updated_at": "2024-05-18T13:12:17.020Z",
            "car_image": "./public/img/audi_q7.jpeg",
            "order": [
                {
                    "order_id": 8,
                    "customer_id": 2,
                    "car_id": 8,
                    "start_rent": "2024-05-18T13:12:17.035Z",
                    "finish_rent": "2024-05-27T13:12:17.035Z",
                    "total_price": 162000000,
                    "status": true,
                    "created_at": "2024-05-18T13:12:17.035Z",
                    "updated_at": "2024-05-18T13:12:17.035Z"
                }
            ]
        },
        {
            "car_id": 9,
            "car_name": "Mercedes-Benz C-Class",
            "car_category": "medium",
            "start_rent": "2024-05-18T13:12:17.020Z",
            "finish_rent": "2024-06-19T13:12:17.020Z",
            "price": 1400000,
            "created_at": "2024-05-18T13:12:17.020Z",
            "updated_at": "2024-05-18T13:12:17.020Z",
            "car_image": "./public/img/mercedes-benz_c-class.jpeg",
            "order": [
                {
                    "order_id": 9,
                    "customer_id": 3,
                    "car_id": 9,
                    "start_rent": "2024-05-18T13:12:17.035Z",
                    "finish_rent": "2024-05-23T13:12:17.035Z",
                    "total_price": 7000000,
                    "status": true,
                    "created_at": "2024-05-18T13:12:17.035Z",
                    "updated_at": "2024-05-18T13:12:17.035Z"
                }
            ]
        },
        {
            "car_id": 15,
            "car_name": "Honda Fit",
            "car_category": "small",
            "start_rent": "2024-05-18T13:12:17.020Z",
            "finish_rent": "2024-08-09T13:12:17.021Z",
            "price": 1100000,
            "created_at": "2024-05-18T13:12:17.021Z",
            "updated_at": "2024-05-18T13:12:17.021Z",
            "car_image": "./public/img/honda_fit.webp",
            "order": []
        },
        {
            "car_id": 16,
            "car_name": "Toyota RAV4",
            "car_category": "medium",
            "start_rent": "2024-05-18T13:12:17.021Z",
            "finish_rent": "2024-07-26T13:12:17.021Z",
            "price": 1500000,
            "created_at": "2024-05-18T13:12:17.021Z",
            "updated_at": "2024-05-18T13:12:17.021Z",
            "car_image": "./public/img/toyota_rav4.jpeg",
            "order": []
        },
        {
            "car_id": 17,
            "car_name": "Ford Escape",
            "car_category": "medium",
            "start_rent": "2024-05-18T13:12:17.021Z",
            "finish_rent": "2024-07-20T13:12:17.021Z",
            "price": 1600000,
            "created_at": "2024-05-18T13:12:17.021Z",
            "updated_at": "2024-05-18T13:12:17.021Z",
            "car_image": "./public/img/ford_escape.jpeg",
            "order": []
        },
        {
            "car_id": 18,
            "car_name": "Chevrolet Silverado",
            "car_category": "large",
            "start_rent": "2024-05-18T13:12:17.021Z",
            "finish_rent": "2024-07-02T13:12:17.021Z",
            "price": 19000000,
            "created_at": "2024-05-18T13:12:17.021Z",
            "updated_at": "2024-05-18T13:12:17.021Z",
            "car_image": "./public/img/chevrolet_silverado.jpeg",
            "order": []
        },
        {
            "car_id": 19,
            "car_name": "Hyundai Sonata",
            "car_category": "medium",
            "start_rent": "2024-05-18T13:12:17.021Z",
            "finish_rent": "2024-08-09T13:12:17.021Z",
            "price": 1700000,
            "created_at": "2024-05-18T13:12:17.021Z",
            "updated_at": "2024-05-18T13:12:17.021Z",
            "car_image": "./public/img/honda_civic.jpeg",
            "order": []
        },
        {
            "car_id": 20,
            "car_name": "Nissan Rogue",
            "car_category": "medium",
            "start_rent": "2024-05-18T13:12:17.021Z",
            "finish_rent": "2024-07-13T13:12:17.021Z",
            "price": 1800000,
            "created_at": "2024-05-18T13:12:17.021Z",
            "updated_at": "2024-05-18T13:12:17.021Z",
            "car_image": "./public/img/toyota_corolla.jpg",
            "order": []
        }
    ]
}
```

The car image file will also be deleted from local

![image](https://github.com/agung-madani/24001143-synrgy7-arm-bcr-ch5/assets/121701309/5cabc282-97ce-4768-b50a-ee5699c932cd)

### Customers

- **Create a customer**
  - `POST /customers`
  - Body: `customer_email`, `customer_name`, `customer_phone_number`, `username`, `password`
  - POSTMAN Test:
 
![image](https://github.com/agung-madani/24001143-synrgy7-arm-bcr-ch5/assets/121701309/ed6c4673-d308-47af-844a-0b2d414cc611)

```json
{
    "message": "Customer created successfully",
    "data": {
        "customer_id": 4,
        "customer_email": "lets'go@example.com",
        "customer_name": "LET'S GOOOO",
        "customer_phone_number": "1111111111111111",
        "username": "letsgo789",
        "password": "813.x;1ma;39",
        "order": []
    }
}
```

- **Get all customers**
  - `GET /customers`
  - POSTMAN Test:

```json
{
    "message": "Read Successfully",
    "data": [
        {
            "customer_id": 1,
            "customer_email": "agung@example.com",
            "customer_name": "Agung",
            "customer_phone_number": "081234567890",
            "username": "agung123",
            "password": "password123",
            "order": [
                {
                    "order_id": 1,
                    "customer_id": 1,
                    "car_id": 1,
                    "start_rent": "2024-05-18T13:12:17.035Z",
                    "finish_rent": "2024-05-23T13:12:17.035Z",
                    "total_price": 1000000,
                    "status": true,
                    "created_at": "2024-05-18T13:12:17.035Z",
                    "updated_at": "2024-05-18T13:12:17.035Z"
                },
                {
                    "order_id": 4,
                    "customer_id": 1,
                    "car_id": 4,
                    "start_rent": "2024-05-18T13:12:17.035Z",
                    "finish_rent": "2024-05-22T13:12:17.035Z",
                    "total_price": 20000000,
                    "status": true,
                    "created_at": "2024-05-18T13:12:17.035Z",
                    "updated_at": "2024-05-18T13:12:17.035Z"
                },
                {
                    "order_id": 7,
                    "customer_id": 1,
                    "car_id": 7,
                    "start_rent": "2024-05-18T13:12:17.035Z",
                    "finish_rent": "2024-05-20T13:12:17.035Z",
                    "total_price": 2400000,
                    "status": true,
                    "created_at": "2024-05-18T13:12:17.035Z",
                    "updated_at": "2024-05-18T13:12:17.035Z"
                },
                {
                    "order_id": 10,
                    "customer_id": 1,
                    "car_id": 10,
                    "start_rent": "2024-05-18T13:12:17.035Z",
                    "finish_rent": "2024-05-25T13:12:17.035Z",
                    "total_price": 5600000,
                    "status": true,
                    "created_at": "2024-05-18T13:12:17.035Z",
                    "updated_at": "2024-05-18T13:12:17.035Z"
                }
            ]
        },
        {
            "customer_id": 2,
            "customer_email": "rashif@example.com",
            "customer_name": "Rashif",
            "customer_phone_number": "081234567891",
            "username": "rashif123",
            "password": "password123",
            "order": [
                {
                    "order_id": 2,
                    "customer_id": 2,
                    "car_id": 2,
                    "start_rent": "2024-05-18T13:12:17.035Z",
                    "finish_rent": "2024-05-25T13:12:17.035Z",
                    "total_price": 2800000,
                    "status": true,
                    "created_at": "2024-05-18T13:12:17.035Z",
                    "updated_at": "2024-05-18T13:12:17.035Z"
                },
                {
                    "order_id": 5,
                    "customer_id": 2,
                    "car_id": 5,
                    "start_rent": "2024-05-18T13:12:17.035Z",
                    "finish_rent": "2024-05-24T13:12:17.035Z",
                    "total_price": 3600000,
                    "status": true,
                    "created_at": "2024-05-18T13:12:17.035Z",
                    "updated_at": "2024-05-18T13:12:17.035Z"
                },
                {
                    "order_id": 8,
                    "customer_id": 2,
                    "car_id": 8,
                    "start_rent": "2024-05-18T13:12:17.035Z",
                    "finish_rent": "2024-05-27T13:12:17.035Z",
                    "total_price": 162000000,
                    "status": true,
                    "created_at": "2024-05-18T13:12:17.035Z",
                    "updated_at": "2024-05-18T13:12:17.035Z"
                }
            ]
        },
        {
            "customer_id": 3,
            "customer_email": "madani@example.com",
            "customer_name": "Madani",
            "customer_phone_number": "081234567892",
            "username": "madani123",
            "password": "password123",
            "order": [
                {
                    "order_id": 3,
                    "customer_id": 3,
                    "car_id": 3,
                    "start_rent": "2024-05-18T13:12:17.035Z",
                    "finish_rent": "2024-05-21T13:12:17.035Z",
                    "total_price": 9000000,
                    "status": true,
                    "created_at": "2024-05-18T13:12:17.035Z",
                    "updated_at": "2024-05-18T13:12:17.035Z"
                },
                {
                    "order_id": 6,
                    "customer_id": 3,
                    "car_id": 6,
                    "start_rent": "2024-05-18T13:12:17.035Z",
                    "finish_rent": "2024-05-26T13:12:17.035Z",
                    "total_price": 5600000,
                    "status": true,
                    "created_at": "2024-05-18T13:12:17.035Z",
                    "updated_at": "2024-05-18T13:12:17.035Z"
                },
                {
                    "order_id": 9,
                    "customer_id": 3,
                    "car_id": 9,
                    "start_rent": "2024-05-18T13:12:17.035Z",
                    "finish_rent": "2024-05-23T13:12:17.035Z",
                    "total_price": 7000000,
                    "status": true,
                    "created_at": "2024-05-18T13:12:17.035Z",
                    "updated_at": "2024-05-18T13:12:17.035Z"
                }
            ]
        },
        {
            "customer_id": 4,
            "customer_email": "lets'go@example.com",
            "customer_name": "LET'S GOOOO",
            "customer_phone_number": "1111111111111111",
            "username": "letsgo789",
            "password": "813.x;1ma;39",
            "order": []
        }
    ]
}
```

- **Get a customer by ID**
  - `GET /customers/:id`
  - POSTMAN Test: `GET /customers/4`

```json
{
    "message": "Read Successfully",
    "data": {
        "customer_id": 4,
        "customer_email": "lets'go@example.com",
        "customer_name": "LET'S GOOOO",
        "customer_phone_number": "1111111111111111",
        "username": "letsgo789",
        "password": "813.x;1ma;39",
        "order": []
    }
}
```

- **Update a customer by ID**
  - `PUT /customers/:id`
  - Body: `customer_email`, `customer_name`, `customer_phone_number`, `username`, `password`
  - POSTMAN Test: `PUT /customers/4`
 
![image](https://github.com/agung-madani/24001143-synrgy7-arm-bcr-ch5/assets/121701309/f7bcb1be-c0ba-436d-8dd9-28db5bdea507)

```json
{
    "message": "Customer updated successfully",
    "data": {
        "customer_id": 4,
        "customer_email": "123123@example.com",
        "customer_name": "adwqvwr",
        "customer_phone_number": "1230790",
        "username": "asdo012",
        "password": ",03f.02x4)(@)9s",
        "order": []
    }
}
```

- **Delete a customer by ID**
  - `DELETE /customers/:id`
  - POSTMAN Test: `DELETE /customers/4`

```json
{
    "message": "Customer Deleted successfully",
    "data": [
        {
            "customer_id": 1,
            "customer_email": "agung@example.com",
            "customer_name": "Agung",
            "customer_phone_number": "081234567890",
            "username": "agung123",
            "password": "password123",
            "order": [
                {
                    "order_id": 1,
                    "customer_id": 1,
                    "car_id": 1,
                    "start_rent": "2024-05-18T13:12:17.035Z",
                    "finish_rent": "2024-05-23T13:12:17.035Z",
                    "total_price": 1000000,
                    "status": true,
                    "created_at": "2024-05-18T13:12:17.035Z",
                    "updated_at": "2024-05-18T13:12:17.035Z"
                },
                {
                    "order_id": 4,
                    "customer_id": 1,
                    "car_id": 4,
                    "start_rent": "2024-05-18T13:12:17.035Z",
                    "finish_rent": "2024-05-22T13:12:17.035Z",
                    "total_price": 20000000,
                    "status": true,
                    "created_at": "2024-05-18T13:12:17.035Z",
                    "updated_at": "2024-05-18T13:12:17.035Z"
                },
                {
                    "order_id": 7,
                    "customer_id": 1,
                    "car_id": 7,
                    "start_rent": "2024-05-18T13:12:17.035Z",
                    "finish_rent": "2024-05-20T13:12:17.035Z",
                    "total_price": 2400000,
                    "status": true,
                    "created_at": "2024-05-18T13:12:17.035Z",
                    "updated_at": "2024-05-18T13:12:17.035Z"
                },
                {
                    "order_id": 10,
                    "customer_id": 1,
                    "car_id": 10,
                    "start_rent": "2024-05-18T13:12:17.035Z",
                    "finish_rent": "2024-05-25T13:12:17.035Z",
                    "total_price": 5600000,
                    "status": true,
                    "created_at": "2024-05-18T13:12:17.035Z",
                    "updated_at": "2024-05-18T13:12:17.035Z"
                }
            ]
        },
        {
            "customer_id": 2,
            "customer_email": "rashif@example.com",
            "customer_name": "Rashif",
            "customer_phone_number": "081234567891",
            "username": "rashif123",
            "password": "password123",
            "order": [
                {
                    "order_id": 2,
                    "customer_id": 2,
                    "car_id": 2,
                    "start_rent": "2024-05-18T13:12:17.035Z",
                    "finish_rent": "2024-05-25T13:12:17.035Z",
                    "total_price": 2800000,
                    "status": true,
                    "created_at": "2024-05-18T13:12:17.035Z",
                    "updated_at": "2024-05-18T13:12:17.035Z"
                },
                {
                    "order_id": 5,
                    "customer_id": 2,
                    "car_id": 5,
                    "start_rent": "2024-05-18T13:12:17.035Z",
                    "finish_rent": "2024-05-24T13:12:17.035Z",
                    "total_price": 3600000,
                    "status": true,
                    "created_at": "2024-05-18T13:12:17.035Z",
                    "updated_at": "2024-05-18T13:12:17.035Z"
                },
                {
                    "order_id": 8,
                    "customer_id": 2,
                    "car_id": 8,
                    "start_rent": "2024-05-18T13:12:17.035Z",
                    "finish_rent": "2024-05-27T13:12:17.035Z",
                    "total_price": 162000000,
                    "status": true,
                    "created_at": "2024-05-18T13:12:17.035Z",
                    "updated_at": "2024-05-18T13:12:17.035Z"
                }
            ]
        },
        {
            "customer_id": 3,
            "customer_email": "madani@example.com",
            "customer_name": "Madani",
            "customer_phone_number": "081234567892",
            "username": "madani123",
            "password": "password123",
            "order": [
                {
                    "order_id": 3,
                    "customer_id": 3,
                    "car_id": 3,
                    "start_rent": "2024-05-18T13:12:17.035Z",
                    "finish_rent": "2024-05-21T13:12:17.035Z",
                    "total_price": 9000000,
                    "status": true,
                    "created_at": "2024-05-18T13:12:17.035Z",
                    "updated_at": "2024-05-18T13:12:17.035Z"
                },
                {
                    "order_id": 6,
                    "customer_id": 3,
                    "car_id": 6,
                    "start_rent": "2024-05-18T13:12:17.035Z",
                    "finish_rent": "2024-05-26T13:12:17.035Z",
                    "total_price": 5600000,
                    "status": true,
                    "created_at": "2024-05-18T13:12:17.035Z",
                    "updated_at": "2024-05-18T13:12:17.035Z"
                },
                {
                    "order_id": 9,
                    "customer_id": 3,
                    "car_id": 9,
                    "start_rent": "2024-05-18T13:12:17.035Z",
                    "finish_rent": "2024-05-23T13:12:17.035Z",
                    "total_price": 7000000,
                    "status": true,
                    "created_at": "2024-05-18T13:12:17.035Z",
                    "updated_at": "2024-05-18T13:12:17.035Z"
                }
            ]
        }
    ]
}
```

### Orders

- **Create an order**
  - `POST /orders`
  - Body: `customer_id`, `car_id`, `start_rent`, `finish_rent`
  - POSTMAN Test:

![image](https://github.com/agung-madani/24001143-synrgy7-arm-bcr-ch5/assets/121701309/a379f609-eaec-4ad1-a547-d0951788aa25)

```json
{
    "message": "Order created successfully",
    "data": {
        "order_id": 11,
        "customer_id": 1,
        "car_id": 19,
        "start_rent": "2024-05-25T13:46:41.465Z",
        "finish_rent": "2024-06-14T13:46:41.465Z",
        "total_price": 35700000,
        "status": true,
        "created_at": "2024-05-18T13:46:41.465Z",
        "updated_at": "2024-05-18T13:46:41.465Z",
        "customer": {
            "customer_id": 1,
            "customer_email": "agung@example.com",
            "customer_name": "Agung",
            "customer_phone_number": "081234567890",
            "username": "agung123",
            "password": "password123"
        },
        "car": {
            "car_id": 19,
            "car_name": "Hyundai Sonata",
            "car_category": "medium",
            "start_rent": "2024-05-18T13:12:17.021Z",
            "finish_rent": "2024-08-09T13:12:17.021Z",
            "price": 1700000,
            "created_at": "2024-05-18T13:12:17.021Z",
            "updated_at": "2024-05-18T13:12:17.021Z",
            "car_image": "./public/img/honda_civic.jpeg"
        }
    }
}
```

- **Get all orders**
  - `GET /orders`

```json
{
    "message": "Read Successfully",
    "data": [
        {
            "order_id": 1,
            "customer_id": 1,
            "car_id": 1,
            "start_rent": "2024-05-18T13:12:17.035Z",
            "finish_rent": "2024-05-23T13:12:17.035Z",
            "total_price": 1000000,
            "status": true,
            "created_at": "2024-05-18T13:12:17.035Z",
            "updated_at": "2024-05-18T13:12:17.035Z",
            "customer": {
                "customer_id": 1,
                "customer_email": "agung@example.com",
                "customer_name": "Agung",
                "customer_phone_number": "081234567890",
                "username": "agung123",
                "password": "password123"
            },
            "car": {
                "car_id": 1,
                "car_name": "Toyota Corolla",
                "car_category": "medium",
                "start_rent": "2024-05-18T13:12:17.019Z",
                "finish_rent": "2024-06-17T13:12:17.020Z",
                "price": 200000,
                "created_at": "2024-05-18T13:12:17.020Z",
                "updated_at": "2024-05-18T13:12:17.020Z",
                "car_image": "./public/img/toyota_corolla.jpg"
            }
        },
        {
            "order_id": 2,
            "customer_id": 2,
            "car_id": 2,
            "start_rent": "2024-05-18T13:12:17.035Z",
            "finish_rent": "2024-05-25T13:12:17.035Z",
            "total_price": 2800000,
            "status": true,
            "created_at": "2024-05-18T13:12:17.035Z",
            "updated_at": "2024-05-18T13:12:17.035Z",
            "customer": {
                "customer_id": 2,
                "customer_email": "rashif@example.com",
                "customer_name": "Rashif",
                "customer_phone_number": "081234567891",
                "username": "rashif123",
                "password": "password123"
            },
            "car": {
                "car_id": 2,
                "car_name": "Honda Civic",
                "car_category": "medium",
                "start_rent": "2024-05-18T13:12:17.020Z",
                "finish_rent": "2025-01-07T13:12:17.020Z",
                "price": 400000,
                "created_at": "2024-05-18T13:12:17.020Z",
                "updated_at": "2024-05-18T13:12:17.020Z",
                "car_image": "./public/img/honda_civic.jpeg"
            }
        },
        {
            "order_id": 3,
            "customer_id": 3,
            "car_id": 3,
            "start_rent": "2024-05-18T13:12:17.035Z",
            "finish_rent": "2024-05-21T13:12:17.035Z",
            "total_price": 9000000,
            "status": true,
            "created_at": "2024-05-18T13:12:17.035Z",
            "updated_at": "2024-05-18T13:12:17.035Z",
            "customer": {
                "customer_id": 3,
                "customer_email": "madani@example.com",
                "customer_name": "Madani",
                "customer_phone_number": "081234567892",
                "username": "madani123",
                "password": "password123"
            },
            "car": {
                "car_id": 3,
                "car_name": "Ford F-150",
                "car_category": "large",
                "start_rent": "2024-05-18T13:12:17.020Z",
                "finish_rent": "2024-06-01T13:12:17.020Z",
                "price": 3000000,
                "created_at": "2024-05-18T13:12:17.020Z",
                "updated_at": "2024-05-18T13:12:17.020Z",
                "car_image": "./public/img/ford_f-150.jpg"
            }
        },
        {
            "order_id": 4,
            "customer_id": 1,
            "car_id": 4,
            "start_rent": "2024-05-18T13:12:17.035Z",
            "finish_rent": "2024-05-22T13:12:17.035Z",
            "total_price": 20000000,
            "status": true,
            "created_at": "2024-05-18T13:12:17.035Z",
            "updated_at": "2024-05-18T13:12:17.035Z",
            "customer": {
                "customer_id": 1,
                "customer_email": "agung@example.com",
                "customer_name": "Agung",
                "customer_phone_number": "081234567890",
                "username": "agung123",
                "password": "password123"
            },
            "car": {
                "car_id": 4,
                "car_name": "Chevrolet Tahoe",
                "car_category": "large",
                "start_rent": "2024-05-18T13:12:17.020Z",
                "finish_rent": "2024-08-15T13:12:17.020Z",
                "price": 5000000,
                "created_at": "2024-05-18T13:12:17.020Z",
                "updated_at": "2024-05-18T13:12:17.020Z",
                "car_image": "./public/img/chevrolet_tahoe.jpg"
            }
        },
        {
            "order_id": 5,
            "customer_id": 2,
            "car_id": 5,
            "start_rent": "2024-05-18T13:12:17.035Z",
            "finish_rent": "2024-05-24T13:12:17.035Z",
            "total_price": 3600000,
            "status": true,
            "created_at": "2024-05-18T13:12:17.035Z",
            "updated_at": "2024-05-18T13:12:17.035Z",
            "customer": {
                "customer_id": 2,
                "customer_email": "rashif@example.com",
                "customer_name": "Rashif",
                "customer_phone_number": "081234567891",
                "username": "rashif123",
                "password": "password123"
            },
            "car": {
                "car_id": 5,
                "car_name": "Nissan Altima",
                "car_category": "medium",
                "start_rent": "2024-05-18T13:12:17.020Z",
                "finish_rent": "2024-07-30T13:12:17.020Z",
                "price": 600000,
                "created_at": "2024-05-18T13:12:17.020Z",
                "updated_at": "2024-05-18T13:12:17.020Z",
                "car_image": "./public/img/nissan_altima.jpg"
            }
        },
        {
            "order_id": 6,
            "customer_id": 3,
            "car_id": 6,
            "start_rent": "2024-05-18T13:12:17.035Z",
            "finish_rent": "2024-05-26T13:12:17.035Z",
            "total_price": 5600000,
            "status": true,
            "created_at": "2024-05-18T13:12:17.035Z",
            "updated_at": "2024-05-18T13:12:17.035Z",
            "customer": {
                "customer_id": 3,
                "customer_email": "madani@example.com",
                "customer_name": "Madani",
                "customer_phone_number": "081234567892",
                "username": "madani123",
                "password": "password123"
            },
            "car": {
                "car_id": 6,
                "car_name": "Hyundai Elantra",
                "car_category": "small",
                "start_rent": "2024-05-18T13:12:17.020Z",
                "finish_rent": "2024-07-13T13:12:17.020Z",
                "price": 700000,
                "created_at": "2024-05-18T13:12:17.020Z",
                "updated_at": "2024-05-18T13:12:17.020Z",
                "car_image": "./public/img/hyundai_elantra.jpg"
            }
        },
        {
            "order_id": 7,
            "customer_id": 1,
            "car_id": 7,
            "start_rent": "2024-05-18T13:12:17.035Z",
            "finish_rent": "2024-05-20T13:12:17.035Z",
            "total_price": 2400000,
            "status": true,
            "created_at": "2024-05-18T13:12:17.035Z",
            "updated_at": "2024-05-18T13:12:17.035Z",
            "customer": {
                "customer_id": 1,
                "customer_email": "agung@example.com",
                "customer_name": "Agung",
                "customer_phone_number": "081234567890",
                "username": "agung123",
                "password": "password123"
            },
            "car": {
                "car_id": 7,
                "car_name": "BMW 3 Series",
                "car_category": "medium",
                "start_rent": "2024-05-18T13:12:17.020Z",
                "finish_rent": "2024-06-23T13:12:17.020Z",
                "price": 1200000,
                "created_at": "2024-05-18T13:12:17.020Z",
                "updated_at": "2024-05-18T13:12:17.020Z",
                "car_image": "./public/img/bmw_3_series.jpg"
            }
        },
        {
            "order_id": 8,
            "customer_id": 2,
            "car_id": 8,
            "start_rent": "2024-05-18T13:12:17.035Z",
            "finish_rent": "2024-05-27T13:12:17.035Z",
            "total_price": 162000000,
            "status": true,
            "created_at": "2024-05-18T13:12:17.035Z",
            "updated_at": "2024-05-18T13:12:17.035Z",
            "customer": {
                "customer_id": 2,
                "customer_email": "rashif@example.com",
                "customer_name": "Rashif",
                "customer_phone_number": "081234567891",
                "username": "rashif123",
                "password": "password123"
            },
            "car": {
                "car_id": 8,
                "car_name": "Audi Q7",
                "car_category": "large",
                "start_rent": "2024-05-18T13:12:17.020Z",
                "finish_rent": "2025-12-17T13:12:17.020Z",
                "price": 18000000,
                "created_at": "2024-05-18T13:12:17.020Z",
                "updated_at": "2024-05-18T13:12:17.020Z",
                "car_image": "./public/img/audi_q7.jpeg"
            }
        },
        {
            "order_id": 9,
            "customer_id": 3,
            "car_id": 9,
            "start_rent": "2024-05-18T13:12:17.035Z",
            "finish_rent": "2024-05-23T13:12:17.035Z",
            "total_price": 7000000,
            "status": true,
            "created_at": "2024-05-18T13:12:17.035Z",
            "updated_at": "2024-05-18T13:12:17.035Z",
            "customer": {
                "customer_id": 3,
                "customer_email": "madani@example.com",
                "customer_name": "Madani",
                "customer_phone_number": "081234567892",
                "username": "madani123",
                "password": "password123"
            },
            "car": {
                "car_id": 9,
                "car_name": "Mercedes-Benz C-Class",
                "car_category": "medium",
                "start_rent": "2024-05-18T13:12:17.020Z",
                "finish_rent": "2024-06-19T13:12:17.020Z",
                "price": 1400000,
                "created_at": "2024-05-18T13:12:17.020Z",
                "updated_at": "2024-05-18T13:12:17.020Z",
                "car_image": "./public/img/mercedes-benz_c-class.jpeg"
            }
        },
        {
            "order_id": 10,
            "customer_id": 1,
            "car_id": 10,
            "start_rent": "2024-05-18T13:12:17.035Z",
            "finish_rent": "2024-05-25T13:12:17.035Z",
            "total_price": 5600000,
            "status": true,
            "created_at": "2024-05-18T13:12:17.035Z",
            "updated_at": "2024-05-18T13:12:17.035Z",
            "customer": {
                "customer_id": 1,
                "customer_email": "agung@example.com",
                "customer_name": "Agung",
                "customer_phone_number": "081234567890",
                "username": "agung123",
                "password": "password123"
            },
            "car": {
                "car_id": 10,
                "car_name": "Kia Rio",
                "car_category": "small",
                "start_rent": "2024-05-18T13:12:17.020Z",
                "finish_rent": "2024-07-10T13:12:17.020Z",
                "price": 800000,
                "created_at": "2024-05-18T13:12:17.020Z",
                "updated_at": "2024-05-18T13:12:17.020Z",
                "car_image": "./public/img/kia_rio.jpg"
            }
        },
        {
            "order_id": 11,
            "customer_id": 1,
            "car_id": 19,
            "start_rent": "2024-05-25T13:46:41.465Z",
            "finish_rent": "2024-06-14T13:46:41.465Z",
            "total_price": 35700000,
            "status": true,
            "created_at": "2024-05-18T13:46:41.465Z",
            "updated_at": "2024-05-18T13:46:41.465Z",
            "customer": {
                "customer_id": 1,
                "customer_email": "agung@example.com",
                "customer_name": "Agung",
                "customer_phone_number": "081234567890",
                "username": "agung123",
                "password": "password123"
            },
            "car": {
                "car_id": 19,
                "car_name": "Hyundai Sonata",
                "car_category": "medium",
                "start_rent": "2024-05-18T13:12:17.021Z",
                "finish_rent": "2024-08-09T13:12:17.021Z",
                "price": 1700000,
                "created_at": "2024-05-18T13:12:17.021Z",
                "updated_at": "2024-05-18T13:12:17.021Z",
                "car_image": "./public/img/honda_civic.jpeg"
            }
        }
    ]
}
```

- **Get an order by ID**
  - `GET /orders/:id`
  - POSTMAN Test:  `GET /orders/11`

```json
{
    "message": "Read Successfully",
    "data": {
        "order_id": 11,
        "customer_id": 1,
        "car_id": 19,
        "start_rent": "2024-05-25T13:46:41.465Z",
        "finish_rent": "2024-06-14T13:46:41.465Z",
        "total_price": 35700000,
        "status": true,
        "created_at": "2024-05-18T13:46:41.465Z",
        "updated_at": "2024-05-18T13:46:41.465Z",
        "customer": {
            "customer_id": 1,
            "customer_email": "agung@example.com",
            "customer_name": "Agung",
            "customer_phone_number": "081234567890",
            "username": "agung123",
            "password": "password123"
        },
        "car": {
            "car_id": 19,
            "car_name": "Hyundai Sonata",
            "car_category": "medium",
            "start_rent": "2024-05-18T13:12:17.021Z",
            "finish_rent": "2024-08-09T13:12:17.021Z",
            "price": 1700000,
            "created_at": "2024-05-18T13:12:17.021Z",
            "updated_at": "2024-05-18T13:12:17.021Z",
            "car_image": "./public/img/honda_civic.jpeg"
        }
    }
}
```

- **Update an order by ID**
  - `PUT /orders/:id`
  - Body: `car_id`, `start_rent`, `finish_rent`, `status`
  - POSTMAN Test: `PUT /orders/11`

![image](https://github.com/agung-madani/24001143-synrgy7-arm-bcr-ch5/assets/121701309/c27fb89b-d9df-40c7-8dd0-77432d5f5f33)

```json
{
    "message": "Order updated successfully",
    "data": {
        "order_id": 11,
        "customer_id": 1,
        "car_id": 2,
        "start_rent": "2024-05-21T13:48:33.885Z",
        "finish_rent": "2024-05-21T13:48:33.885Z",
        "total_price": 400000,
        "status": false,
        "created_at": "2024-05-18T13:46:41.465Z",
        "updated_at": "2024-05-18T13:48:33.885Z",
        "customer": {
            "customer_id": 1,
            "customer_email": "agung@example.com",
            "customer_name": "Agung",
            "customer_phone_number": "081234567890",
            "username": "agung123",
            "password": "password123"
        },
        "car": {
            "car_id": 2,
            "car_name": "Honda Civic",
            "car_category": "medium",
            "start_rent": "2024-05-18T13:12:17.020Z",
            "finish_rent": "2025-01-07T13:12:17.020Z",
            "price": 400000,
            "created_at": "2024-05-18T13:12:17.020Z",
            "updated_at": "2024-05-18T13:12:17.020Z",
            "car_image": "./public/img/honda_civic.jpeg"
        }
    }
}
```

- **Delete an order by ID**
  - `DELETE /orders/:id`
  - POSTMAN Test: `DELETE /orders/11`
```json
{
    "message": "Order deleted successfully",
    "data": [
        {
            "order_id": 1,
            "customer_id": 1,
            "car_id": 1,
            "start_rent": "2024-05-18T13:12:17.035Z",
            "finish_rent": "2024-05-23T13:12:17.035Z",
            "total_price": 1000000,
            "status": true,
            "created_at": "2024-05-18T13:12:17.035Z",
            "updated_at": "2024-05-18T13:12:17.035Z",
            "customer": {
                "customer_id": 1,
                "customer_email": "agung@example.com",
                "customer_name": "Agung",
                "customer_phone_number": "081234567890",
                "username": "agung123",
                "password": "password123"
            },
            "car": {
                "car_id": 1,
                "car_name": "Toyota Corolla",
                "car_category": "medium",
                "start_rent": "2024-05-18T13:12:17.019Z",
                "finish_rent": "2024-06-17T13:12:17.020Z",
                "price": 200000,
                "created_at": "2024-05-18T13:12:17.020Z",
                "updated_at": "2024-05-18T13:12:17.020Z",
                "car_image": "./public/img/toyota_corolla.jpg"
            }
        },
        {
            "order_id": 2,
            "customer_id": 2,
            "car_id": 2,
            "start_rent": "2024-05-18T13:12:17.035Z",
            "finish_rent": "2024-05-25T13:12:17.035Z",
            "total_price": 2800000,
            "status": true,
            "created_at": "2024-05-18T13:12:17.035Z",
            "updated_at": "2024-05-18T13:12:17.035Z",
            "customer": {
                "customer_id": 2,
                "customer_email": "rashif@example.com",
                "customer_name": "Rashif",
                "customer_phone_number": "081234567891",
                "username": "rashif123",
                "password": "password123"
            },
            "car": {
                "car_id": 2,
                "car_name": "Honda Civic",
                "car_category": "medium",
                "start_rent": "2024-05-18T13:12:17.020Z",
                "finish_rent": "2025-01-07T13:12:17.020Z",
                "price": 400000,
                "created_at": "2024-05-18T13:12:17.020Z",
                "updated_at": "2024-05-18T13:12:17.020Z",
                "car_image": "./public/img/honda_civic.jpeg"
            }
        },
        {
            "order_id": 3,
            "customer_id": 3,
            "car_id": 3,
            "start_rent": "2024-05-18T13:12:17.035Z",
            "finish_rent": "2024-05-21T13:12:17.035Z",
            "total_price": 9000000,
            "status": true,
            "created_at": "2024-05-18T13:12:17.035Z",
            "updated_at": "2024-05-18T13:12:17.035Z",
            "customer": {
                "customer_id": 3,
                "customer_email": "madani@example.com",
                "customer_name": "Madani",
                "customer_phone_number": "081234567892",
                "username": "madani123",
                "password": "password123"
            },
            "car": {
                "car_id": 3,
                "car_name": "Ford F-150",
                "car_category": "large",
                "start_rent": "2024-05-18T13:12:17.020Z",
                "finish_rent": "2024-06-01T13:12:17.020Z",
                "price": 3000000,
                "created_at": "2024-05-18T13:12:17.020Z",
                "updated_at": "2024-05-18T13:12:17.020Z",
                "car_image": "./public/img/ford_f-150.jpg"
            }
        },
        {
            "order_id": 4,
            "customer_id": 1,
            "car_id": 4,
            "start_rent": "2024-05-18T13:12:17.035Z",
            "finish_rent": "2024-05-22T13:12:17.035Z",
            "total_price": 20000000,
            "status": true,
            "created_at": "2024-05-18T13:12:17.035Z",
            "updated_at": "2024-05-18T13:12:17.035Z",
            "customer": {
                "customer_id": 1,
                "customer_email": "agung@example.com",
                "customer_name": "Agung",
                "customer_phone_number": "081234567890",
                "username": "agung123",
                "password": "password123"
            },
            "car": {
                "car_id": 4,
                "car_name": "Chevrolet Tahoe",
                "car_category": "large",
                "start_rent": "2024-05-18T13:12:17.020Z",
                "finish_rent": "2024-08-15T13:12:17.020Z",
                "price": 5000000,
                "created_at": "2024-05-18T13:12:17.020Z",
                "updated_at": "2024-05-18T13:12:17.020Z",
                "car_image": "./public/img/chevrolet_tahoe.jpg"
            }
        },
        {
            "order_id": 5,
            "customer_id": 2,
            "car_id": 5,
            "start_rent": "2024-05-18T13:12:17.035Z",
            "finish_rent": "2024-05-24T13:12:17.035Z",
            "total_price": 3600000,
            "status": true,
            "created_at": "2024-05-18T13:12:17.035Z",
            "updated_at": "2024-05-18T13:12:17.035Z",
            "customer": {
                "customer_id": 2,
                "customer_email": "rashif@example.com",
                "customer_name": "Rashif",
                "customer_phone_number": "081234567891",
                "username": "rashif123",
                "password": "password123"
            },
            "car": {
                "car_id": 5,
                "car_name": "Nissan Altima",
                "car_category": "medium",
                "start_rent": "2024-05-18T13:12:17.020Z",
                "finish_rent": "2024-07-30T13:12:17.020Z",
                "price": 600000,
                "created_at": "2024-05-18T13:12:17.020Z",
                "updated_at": "2024-05-18T13:12:17.020Z",
                "car_image": "./public/img/nissan_altima.jpg"
            }
        },
        {
            "order_id": 6,
            "customer_id": 3,
            "car_id": 6,
            "start_rent": "2024-05-18T13:12:17.035Z",
            "finish_rent": "2024-05-26T13:12:17.035Z",
            "total_price": 5600000,
            "status": true,
            "created_at": "2024-05-18T13:12:17.035Z",
            "updated_at": "2024-05-18T13:12:17.035Z",
            "customer": {
                "customer_id": 3,
                "customer_email": "madani@example.com",
                "customer_name": "Madani",
                "customer_phone_number": "081234567892",
                "username": "madani123",
                "password": "password123"
            },
            "car": {
                "car_id": 6,
                "car_name": "Hyundai Elantra",
                "car_category": "small",
                "start_rent": "2024-05-18T13:12:17.020Z",
                "finish_rent": "2024-07-13T13:12:17.020Z",
                "price": 700000,
                "created_at": "2024-05-18T13:12:17.020Z",
                "updated_at": "2024-05-18T13:12:17.020Z",
                "car_image": "./public/img/hyundai_elantra.jpg"
            }
        },
        {
            "order_id": 7,
            "customer_id": 1,
            "car_id": 7,
            "start_rent": "2024-05-18T13:12:17.035Z",
            "finish_rent": "2024-05-20T13:12:17.035Z",
            "total_price": 2400000,
            "status": true,
            "created_at": "2024-05-18T13:12:17.035Z",
            "updated_at": "2024-05-18T13:12:17.035Z",
            "customer": {
                "customer_id": 1,
                "customer_email": "agung@example.com",
                "customer_name": "Agung",
                "customer_phone_number": "081234567890",
                "username": "agung123",
                "password": "password123"
            },
            "car": {
                "car_id": 7,
                "car_name": "BMW 3 Series",
                "car_category": "medium",
                "start_rent": "2024-05-18T13:12:17.020Z",
                "finish_rent": "2024-06-23T13:12:17.020Z",
                "price": 1200000,
                "created_at": "2024-05-18T13:12:17.020Z",
                "updated_at": "2024-05-18T13:12:17.020Z",
                "car_image": "./public/img/bmw_3_series.jpg"
            }
        },
        {
            "order_id": 8,
            "customer_id": 2,
            "car_id": 8,
            "start_rent": "2024-05-18T13:12:17.035Z",
            "finish_rent": "2024-05-27T13:12:17.035Z",
            "total_price": 162000000,
            "status": true,
            "created_at": "2024-05-18T13:12:17.035Z",
            "updated_at": "2024-05-18T13:12:17.035Z",
            "customer": {
                "customer_id": 2,
                "customer_email": "rashif@example.com",
                "customer_name": "Rashif",
                "customer_phone_number": "081234567891",
                "username": "rashif123",
                "password": "password123"
            },
            "car": {
                "car_id": 8,
                "car_name": "Audi Q7",
                "car_category": "large",
                "start_rent": "2024-05-18T13:12:17.020Z",
                "finish_rent": "2025-12-17T13:12:17.020Z",
                "price": 18000000,
                "created_at": "2024-05-18T13:12:17.020Z",
                "updated_at": "2024-05-18T13:12:17.020Z",
                "car_image": "./public/img/audi_q7.jpeg"
            }
        },
        {
            "order_id": 9,
            "customer_id": 3,
            "car_id": 9,
            "start_rent": "2024-05-18T13:12:17.035Z",
            "finish_rent": "2024-05-23T13:12:17.035Z",
            "total_price": 7000000,
            "status": true,
            "created_at": "2024-05-18T13:12:17.035Z",
            "updated_at": "2024-05-18T13:12:17.035Z",
            "customer": {
                "customer_id": 3,
                "customer_email": "madani@example.com",
                "customer_name": "Madani",
                "customer_phone_number": "081234567892",
                "username": "madani123",
                "password": "password123"
            },
            "car": {
                "car_id": 9,
                "car_name": "Mercedes-Benz C-Class",
                "car_category": "medium",
                "start_rent": "2024-05-18T13:12:17.020Z",
                "finish_rent": "2024-06-19T13:12:17.020Z",
                "price": 1400000,
                "created_at": "2024-05-18T13:12:17.020Z",
                "updated_at": "2024-05-18T13:12:17.020Z",
                "car_image": "./public/img/mercedes-benz_c-class.jpeg"
            }
        },
        {
            "order_id": 10,
            "customer_id": 1,
            "car_id": 10,
            "start_rent": "2024-05-18T13:12:17.035Z",
            "finish_rent": "2024-05-25T13:12:17.035Z",
            "total_price": 5600000,
            "status": true,
            "created_at": "2024-05-18T13:12:17.035Z",
            "updated_at": "2024-05-18T13:12:17.035Z",
            "customer": {
                "customer_id": 1,
                "customer_email": "agung@example.com",
                "customer_name": "Agung",
                "customer_phone_number": "081234567890",
                "username": "agung123",
                "password": "password123"
            },
            "car": {
                "car_id": 10,
                "car_name": "Kia Rio",
                "car_category": "small",
                "start_rent": "2024-05-18T13:12:17.020Z",
                "finish_rent": "2024-07-10T13:12:17.020Z",
                "price": 800000,
                "created_at": "2024-05-18T13:12:17.020Z",
                "updated_at": "2024-05-18T13:12:17.020Z",
                "car_image": "./public/img/kia_rio.jpg"
            }
        }
    ]
}
```

## Folder Structure

```
.
├── middlewares
│   └── uploadHandler.ts       # Middleware for handling file uploads
├── migrations                 # Knex migrations for database schema
│   ├── 20240518095428_cars.ts
│   ├── 20240518095450_customers.ts
│   └── 20240518095509_orders.ts
├── models                     # Objection models for database tables
│   ├── cars.model.ts
│   ├── customers.model.ts
│   └── orders.model.ts
├── public                     # Public folder for static files
│   └── img                    # Folder for uploaded images
├── seeds                      # Knex seeds for initial data
│   ├── cars.ts
│   ├── customers.ts
│   └── orders.ts
├── views                      # EJS views for rendering HTML
├── knexfile.ts                # Knex configuration
├── index.ts                   # Main application file
├── package.json
├── package-lock.json
└── README.md
```

## Technologies Used

- **TypeScript**: For type-safe JavaScript.
- **Express**: Web framework for Node.js.
- **Knex**: SQL query builder for Node.js.
- **Objection**: ORM for Node.js.
- **Multer**: Middleware for handling file uploads.
- **PostgreSQL**: Relational database.



