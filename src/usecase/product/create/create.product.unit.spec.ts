import ProductRepositoryInterface from "domain/product/repository/product-repository.interface";
import { InputCreateProductDto } from "./create.product.dto";
import CreateProductUseCase from "./create.product.usecase";

describe("[Unit] create product use case", () => {
  let input: InputCreateProductDto;
  let productRepository: jest.Mocked<ProductRepositoryInterface>;
  let productCreateUseCase: CreateProductUseCase;

  beforeEach(() => {
    input = {
      name: "product test",
      price: 100,
    };

    productRepository = {
      find: jest.fn(),
      findAll: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    };

    productCreateUseCase = new CreateProductUseCase(productRepository);
  });

  it("should create a product", async () => {
    const output = await productCreateUseCase.execute(input);

    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      price: 100,
    });
  });

  it("should thrown an error when name is missing", async () => {
    input.name = "";

    await expect(productCreateUseCase.execute(input)).rejects.toThrow(
      "Name is required"
    );
  });

  it("should thrown an error when price is less than zero", async () => {
    input.price = -1;

    await expect(productCreateUseCase.execute(input)).rejects.toThrow(
      "Price is positive"
    );
  });
});
