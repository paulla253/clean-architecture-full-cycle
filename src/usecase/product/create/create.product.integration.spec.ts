import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import CreateProductUseCase from "./create.product.usecase";

describe("[Integration] create product use case", () => {
  let sequelize: Sequelize;
  let productRepository: ProductRepository;
  let productCreateUseCase: CreateProductUseCase;

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

    productCreateUseCase = new CreateProductUseCase(productRepository);
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    const input = {
      name: "any_name",
      price: 100,
    };

    const result = await productCreateUseCase.execute(input);

    expect(result).toEqual({
      id: expect.any(String),
      name: input.name,
      price: input.price,
    });
  });
});
