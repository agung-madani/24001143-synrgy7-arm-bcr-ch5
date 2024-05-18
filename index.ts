import express, { Express, Request, Response } from "express";
import path from "path";
import knex from "knex";
import { Model } from "objection";
import { CustomersModel } from "./models/customers.model";
import { CarsModel } from "./models/cars.model";
import { OrdersModel } from "./models/orders.model";
import upload from "./middlewares/uploadHandler";
import fs from "fs";

const app: Express = express();
const port = 3000;

const knexInstance = knex({
  client: "pg",
  connection: {
    user: "postgres",
    password: "armada009",
    port: 5432,
    host: "localhost",
    database: "bcr",
  },
});

app.set("view engine", "ejs");
app.set("../views", path.join(__dirname, "views"));

Model.knex(knexInstance);
app.use(express.static("public"));
app.use(express.json());

// App to render the web view
app.get("/", async (req, res) => {
  try {
    const cars = await CarsModel.query().withGraphFetched("order");
    res.render("listcar", { cars });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// Create an customer
app.post("/customers", upload.none(), async (req: Request, res: Response) => {
  const {
    customer_email,
    customer_name,
    customer_phone_number,
    username,
    password,
  } = req.body;
  try {
    const lastCustomer = await CustomersModel.query()
      .orderBy("customer_id", "desc")
      .first();
    let newCustomerId = lastCustomer ? lastCustomer.customer_id + 1 : 1;
    await CustomersModel.query().insert({
      customer_id: newCustomerId,
      customer_email,
      customer_name,
      customer_phone_number,
      username,
      password,
    });

    const updatedCustomer = await CustomersModel.query()
      .findById(newCustomerId)
      .withGraphFetched("order");

    return res.json({
      message: "Customer created successfully",
      data: updatedCustomer,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// Read all customers
app.get("/customers", async (_, res: Response) => {
  try {
    const customers = await CustomersModel.query().withGraphFetched("order");
    res.json({ message: "Read Successfully", data: customers });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// Read an customers by id
app.get("/customers/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const customer = await CustomersModel.query()
      .findById(id)
      .withGraphFetched("order");
    if (customer) {
      res.json({ message: "Read Successfully", data: customer });
    } else {
      res.status(404).json({ error: "Customers not found" });
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update an customers by id
app.put(
  "/customers/:id",
  upload.none(),
  async (req: Request, res: Response) => {
    const { id } = req.params;
    console.log(req.body);
    const {
      customer_email,
      customer_name,
      customer_phone_number,
      username,
      password,
    } = req.body;
    try {
      // Fetch the Customer record from the database
      const customer = await CustomersModel.query().findById(id);

      if (!customer) {
        return res.status(404).json({ error: "Customer not found" });
      }

      await CustomersModel.query().findById(id).patch({
        customer_email,
        customer_name,
        customer_phone_number,
        username,
        password,
      });

      const updatedCustomer = await CustomersModel.query()
        .findById(id)
        .withGraphFetched("order");

      return res.json({
        message: "Customer updated successfully",
        data: updatedCustomer,
      });
    } catch (error) {
      console.error("Error:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

// Delete an Customers by id
app.delete("/customers/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    // Fetch the Customer record from the database
    const customer = await CustomersModel.query().findById(id);

    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }

    await CustomersModel.query().deleteById(id);
    
    const updatedCustomer = await CustomersModel.query()
      .withGraphFetched("order");

    return res.json({
      message: "Customer Deleted successfully",
      data: updatedCustomer,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// Create an order
app.post("/orders", upload.none(), async (req: Request, res: Response) => {
  const { customer_id, car_id, start_rent, finish_rent } = req.body;

  try {
    // Fetch the car's price from the database
    const carPriceQuery = await CarsModel.query()
      .findById(car_id)
      .select("price");

    if (!carPriceQuery) {
      return res.status(404).json({ error: "Car not found" });
    }

    const carPrice = carPriceQuery.price;

    // Calculate the total rent days
    const totalRentDays = finish_rent - start_rent + 1;

    // Calculate the total price
    const totalPrice = carPrice * totalRentDays;

    // Fetch the last order_id from the database
    const lastOrder = await OrdersModel.query()
      .orderBy("order_id", "desc")
      .first();
    let newOrderId = lastOrder ? lastOrder.order_id + 1 : 1;

    // Insert the order into the database
    await OrdersModel.query().insert({
      order_id: newOrderId,
      customer_id,
      car_id,
      start_rent: new Date(
        new Date().getTime() + Number(start_rent) * 24 * 60 * 60 * 1000
      ).toISOString(),
      finish_rent: new Date(
        new Date().getTime() + Number(finish_rent) * 24 * 60 * 60 * 1000
      ).toISOString(),
      total_price: totalPrice,
      status: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });

    const orderCar = await OrdersModel.query()
      .findById(newOrderId)
      .withGraphFetched("[customer, car]");

    return res.json({ message: "Order created successfully", data: orderCar });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// Read all Orders
app.get("/orders", async (req: Request, res: Response) => {
  try {
    const orders = await OrdersModel.query().withGraphFetched(
      "[customer, car]"
    );
    res.json({ message: "Read Successfully", data: orders });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// Read an order by ID
app.get("/orders/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const order = await OrdersModel.query()
      .findById(id)
      .withGraphFetched("[customer, car]");

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.json({ message: "Read Successfully", data: order });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update an order by ID
app.put("/orders/:id", upload.none(), async (req: Request, res: Response) => {
  const { id } = req.params;
  const { car_id, start_rent, finish_rent, status } = req.body;

  try {
    const order = await OrdersModel.query().findById(id);

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    // Fetch the car's price from the database
    const carPriceQuery = await CarsModel.query()
      .findById(car_id)
      .select("price");

    if (!carPriceQuery) {
      return res.status(404).json({ error: "Car not found" });
    }

    const carPrice = carPriceQuery.price;

    // Calculate the total rent days
    const totalRentDays = finish_rent - start_rent + 1;

    // Calculate the total price
    const totalPrice = carPrice * totalRentDays;

    await OrdersModel.query()
      .findById(id)
      .patch({
        car_id,
        start_rent: new Date(
          new Date().getTime() + Number(start_rent) * 24 * 60 * 60 * 1000
        ).toISOString(),
        finish_rent: new Date(
          new Date().getTime() + Number(finish_rent) * 24 * 60 * 60 * 1000
        ).toISOString(),
        total_price: totalPrice,
        status,
        updated_at: new Date().toISOString(),
      });

    const orderCar = await OrdersModel.query()
      .findById(id)
      .withGraphFetched("[customer, car]");

    return res.json({ message: "Order updated successfully", data: orderCar });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete an order by ID
app.delete("/orders/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deletedOrder = await OrdersModel.query().deleteById(id);

    if (!deletedOrder) {
      return res.status(404).json({ error: "Order not found" });
    }

    const orderCar = await OrdersModel.query()
      .withGraphFetched("[customer, car]");

    return res.json({ message: "Order deleted successfully", data: orderCar });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// Create a car
app.post(
  "/cars",
  upload.single("car_image"),
  async (req: Request, res: Response) => {
    const { car_name, car_category, start_rent, finish_rent, price } = req.body;
    const car_image = req.file?.filename;

    try {
      // Fetch the last car_id from the database
      const lastCar = await CarsModel.query().orderBy("car_id", "desc").first();
      let newCarId = lastCar ? lastCar.car_id + 1 : 1;

      await CarsModel.query().insert({
        car_id: newCarId,
        car_name,
        car_category,
        start_rent: new Date(
          new Date().getTime() + Number(start_rent) * 24 * 60 * 60 * 1000
        ).toISOString(),
        finish_rent: new Date(
          new Date().getTime() + Number(finish_rent) * 24 * 60 * 60 * 1000
        ).toISOString(),
        price,
        car_image: `./public/img/${car_image}`, // Correct path
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });
      const updatedCar = await CarsModel.query()
        .findById(newCarId)
        .withGraphFetched("order");

      return res.json({
        message: "Car created successfully",
        data: updatedCar,
      });
    } catch (error) {
      console.error("Error:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

// Read all cars
app.get("/cars", async (_, res: Response) => {
  try {
    const cars = await CarsModel.query().withGraphFetched("order");
    res.json({ message: "Read Successfully", data: cars });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// Read an cars by id
app.get("/cars/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const car = await CarsModel.query().findById(id).withGraphFetched("order");
    if (car) {
      res.json({ message: "Read Successfully", data: car });
    } else {
      res.status(404).json({ error: "Cars not found" });
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update a car by ID
app.put(
  "/cars/:id",
  upload.single("car_image"),
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { car_name, car_category, start_rent, finish_rent, price } = req.body;
    const car_image = req.file?.filename;

    try {
      // Fetch the car record from the database
      const car = await CarsModel.query().findById(id);

      if (!car) {
        return res.status(404).json({ error: "Car not found" });
      }

      // Extract filename from car_image
      const filename = car.car_image.split("/").pop();

      // Update the car record with the new data
      await CarsModel.query()
        .findById(id)
        .patch({
          car_name,
          car_category,
          start_rent: new Date(
            new Date().getTime() + Number(start_rent) * 24 * 60 * 60 * 1000
          ).toISOString(),
          finish_rent: new Date(
            new Date().getTime() + Number(finish_rent) * 24 * 60 * 60 * 1000
          ).toISOString(),
          price,
          car_image: car_image ? `/img/${car_image}` : car.car_image, // Use new image if provided, else keep the old one
          updated_at: new Date().toISOString(),
        });

      // If a new image is uploaded, delete the old image file
      if (car_image && filename) {
        fs.unlinkSync(`./public/img/${filename}`);
      }

      const updatedCar = await CarsModel.query()
        .findById(id)
        .withGraphFetched("order");

      return res.json({
        message: "Car updated successfully",
        data: updatedCar,
      });
    } catch (error) {
      console.error("Error:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

// Delete a car by ID
app.delete("/cars/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    // Fetch the car record from the database
    const car = await CarsModel.query().findById(id);

    if (!car) {
      return res.status(404).json({ error: "Car not found" });
    }

    // Extract filename from car_image
    const filename = car.car_image.split("/").pop();

    // Delete the image file from public/img directory
    fs.unlinkSync(`./public/img/${filename}`);

    // Delete the car record from the database
    await CarsModel.query().deleteById(id);
    const updatedCar = await CarsModel.query()
      .withGraphFetched("order");

    return res.json({
      message: "Car deleted successfully!",
      data: updatedCar,
    });

  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
