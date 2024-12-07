import Product from "../../../domain/product/entity/product";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputUpdateProductDto } from "./update.product.dto";
import UpdateProductUseCase from "./update.product.usecase";

describe("[Unit] update product use case", () => {
  let input: InputUpdateProductDto;
  let product: Product;
  let productRepository: jest.Mocked<ProductRepositoryInterface>;
  let productCreateUseCase: UpdateProductUseCase;

  beforeEach(() => {
    input = {
      id: "any_id",
      name: "product test",
      price: 70,
    };

    product = new Product(input.id, input.name, input.price);

    productRepository = {
      find: jest.fn().mockResolvedValue(product),
      findAll: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    };

    productCreateUseCase = new UpdateProductUseCase(productRepository);
  });

  it("should update a product", async () => {
    const output = await productCreateUseCase.execute(input);

    expect(output).toEqual({
      id: expect.any(String),
      name: product.name,
      price: product.price,
    });
  });
});
