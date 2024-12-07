import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import FindProductUseCase from "./find.product.usecase";
import Product from "../../../domain/product/entity/product";

describe("[Integration] find product use case", () => {
  let sequelize: Sequelize;
  let productRepository: ProductRepository;
  let productFindUseCase: FindProductUseCase;

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

    productFindUseCase = new FindProductUseCase(productRepository);
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should find a product", async () => {
    const input = {
      id: "any_id",
    };

    const product = new Product(input.id, "any_name", 100);

    await productRepository.create(product);

    const output = {
      id: input.id,
      name: "any_name",
      price: 100,
    };

    const result = await productFindUseCase.execute(input);

    expect(result).toEqual(output);
  });
});
