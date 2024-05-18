import { Model, ModelObject } from "objection";
import { OrdersModel } from "./orders.model";

export class CarsModel extends Model {
  static tableName = "cars";
  car_id!: number;
  car_name!: string;
  car_category!: string;
  start_rent!: string;
  finish_rent!: string;
  price!: number;
  created_at!: string;
  updated_at!: string;
  car_image!: string;

  static get idColumn() {
    return "car_id";
  }

  static get relationMappings() {
    return {
      order: {
        relation: Model.HasManyRelation,
        modelClass: OrdersModel,
        join: {
          from: "cars.car_id",
          to: "orders.car_id",
        },
      },
    };
  }
}
export type Cars = ModelObject<CarsModel>;
