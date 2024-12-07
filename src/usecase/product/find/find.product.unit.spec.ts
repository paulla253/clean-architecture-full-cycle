import ProductRepositoryInterface from "domain/product/repository/product-repository.interface";
import { InputFindProductDto } from "./find.product.dto";
import FindProductUseCase from "./find.product.usecase";

describe("[Unit] find product use case", () => {
  let input: InputFindProductDto;
  let productFindUseCase: FindProductUseCase;
  let productRepository: jest.Mocked<ProductRepositoryInterface>;

  beforeEach(() => {
    input = {
      id: "any_id",
    };

    const output = {
      id: input.id,
      name: "any_name",
      price: 100,
    };

    productRepository = {
      find: jest.fn().mockResolvedValue(output),
      findAll: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    };

    productFindUseCase = new FindProductUseCase(productRepository);
  });

  it("should find a product", async () => {
    const output = await productFindUseCase.execute(input);

    expect(output).toEqual({
      id: output.id,
      name: output.name,
      price: output.price,
    });
  });

  it("should not find a product", async () => {
    productRepository.find.mockImplementation(() => {
      throw new Error("Product not found");
    });

    expect(() => {
      return productFindUseCase.execute(input);
    }).rejects.toThrow("Product not found");
  });
});
