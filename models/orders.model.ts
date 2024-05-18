import { Model } from "objection";
import { CustomersModel } from "./customers.model";
import { CarsModel } from "./cars.model";

export class OrdersModel extends Model {
  static tableName = "orders";

  order_id!: number;
  customer_id!: number;
  car_id!: number;
  start_rent!: string;
  finish_rent!: string;
  total_price!: number;
  status!: boolean;
  created_at!: string;
  updated_at!: string;

  static get idColumn() {
    return "order_id";
  }

  static get relationMappings() {
    return {
      customer: {
        relation: Model.BelongsToOneRelation,
        modelClass: CustomersModel,
        join: {
          from: "orders.customer_id",
          to: "customers.customer_id",
        },
      },
      car: {
        relation: Model.BelongsToOneRelation,
        modelClass: CarsModel,
        join: {
          from: "orders.car_id",
          to: "cars.car_id",
        },
      },
    };
  }
}
