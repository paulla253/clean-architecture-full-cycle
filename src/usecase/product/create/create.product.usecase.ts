import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import {
  InputCreateProductDto,
  OutputCreateProductDto,
} from "./create.product.dto";
import ProductFactory, {
  EProduct,
} from "../../../domain/product/factory/product.factory";
import Product from "../../../domain/product/entity/product";

export default class CreateProductUseCase {
  constructor(private readonly productRepository: ProductRepositoryInterface) {}

  async execute(input: InputCreateProductDto): Promise<OutputCreateProductDto> {
    const product = ProductFactory.create(EProduct.A, input.name, input.price);

    await this.productRepository.create(product as Product);

    return {
      id: product.id,
      name: product.name,
      price: product.price,
    };
  }
}
