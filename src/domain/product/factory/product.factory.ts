import Product from "../entity/product";
import ProductInterface from "../entity/product.interface";
import { v4 as uuid } from "uuid";
import ProductB from "../entity/product-b";

export enum EProduct {
  A = "a",
  B = "b",
}

export default class ProductFactory {
  public static create(
    type: string,
    name: string,
    price: number,
    id?: string
  ): ProductInterface {
    switch (type) {
      case EProduct.A:
        return new Product(uuid(), name, price);
      case EProduct.B:
        return new ProductB(id, name, price);
      default:
        throw new Error("Product type not supported");
    }
  }
}
