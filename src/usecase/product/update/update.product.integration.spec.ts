import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import UpdateProductUseCase from "./update.product.usecase";
import Product from "../../../domain/product/entity/product";

describe("[Integration] update product use case", () => {
  let sequelize: Sequelize;
  let productRepository: ProductRepository;
  let productUpdateUseCase: UpdateProductUseCase;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ProductModel]);
    await sequelize.sync();

    productRepository = new ProductRepository();

    productUpdateUseCase = new UpdateProductUseCase(productRepository);
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should update a product", async () => {
    const input = {
      id: "any_id",
      name: "any_name",
      price: 100,
    };

    const product = new Product(input.id, "any_name", 70);
    await productRepository.create(product);

    const result = await productUpdateUseCase.execute(input);

    expect(result).toEqual({
      id: expect.any(String),
      name: input.name,
      price: input.price,
    });
  });
});
