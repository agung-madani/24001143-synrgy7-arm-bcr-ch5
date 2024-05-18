import { Model, ModelObject } from "objection";
import { OrdersModel } from "./orders.model";

export class CustomersModel extends Model {
  static tableName = "customers";

  customer_id!: number;
  customer_email!: string;
  customer_name!: string;
  customer_phone_number!: string;
  username!: string;
  password!: string;

  static get idColumn() {
    return "customer_id";
  }

  static get relationMappings() {
    return {
      order: {
        relation: Model.HasManyRelation,
        modelClass: OrdersModel,
        join: {
          from: "customers.customer_id",
          to: "orders.customer_id",
        },
      },
    };
  }
}

export type Customers = ModelObject<CustomersModel>;
