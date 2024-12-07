import ProductRepositoryInterface from "domain/product/repository/product-repository.interface";
import ListProductUseCase from "./list.product.usecase";
import Product from "../../../domain/product/entity/product";

describe("[Unit] list product use case", () => {
  let productListUseCase: ListProductUseCase;
  let productRepository: jest.Mocked<ProductRepositoryInterface>;
  let outputRepository: Product[];

  beforeEach(() => {
    const product1 = new Product("123", "any_name", 70);

    const product2 = new Product("123", "any_name", 100);

    outputRepository = [product1, product2];

    productRepository = {
      find: jest.fn(),
      findAll: jest.fn().mockResolvedValue(outputRepository),
      create: jest.fn(),
      update: jest.fn(),
    };

    productListUseCase = new ListProductUseCase(productRepository);
  });

  it("should list a product", async () => {
    const output = await productListUseCase.execute({});

    expect(output.products.length).toBe(2);
    expect(output.products[0].id).toBe(outputRepository[0].id);
    expect(output.products[0].name).toBe(outputRepository[0].name);
    expect(output.products[0].price).toBe(outputRepository[0].price);
    expect(output.products[1].id).toBe(outputRepository[1].id);
    expect(output.products[1].name).toBe(outputRepository[1].name);
    expect(output.products[1].price).toBe(outputRepository[1].price);
  });
});
