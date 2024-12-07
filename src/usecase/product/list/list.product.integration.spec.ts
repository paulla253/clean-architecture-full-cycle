import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import Product from "../../../domain/product/entity/product";
import ListProductUseCase from "./list.product.usecase";

describe("[Integration] list product use case", () => {
  let sequelize: Sequelize;
  let productRepository: ProductRepository;
  let productListUseCase: ListProductUseCase;

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

    productListUseCase = new ListProductUseCase(productRepository);
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should list a product", async () => {
    const product1 = new Product("any_id_1", "any_name", 100);
    await productRepository.create(product1);

    const product2 = new Product("any_id_2", "any_name", 100);
    await productRepository.create(product2);

    const output = await productListUseCase.execute({});

    expect(output.products.length).toBe(2);
    expect(output.products[0].id).toBe(product1.id);
    expect(output.products[0].name).toBe(product1.name);
    expect(output.products[0].price).toBe(product1.price);
    expect(output.products[1].id).toBe(product2.id);
    expect(output.products[1].name).toBe(product2.name);
    expect(output.products[1].price).toBe(product2.price);
  });
});