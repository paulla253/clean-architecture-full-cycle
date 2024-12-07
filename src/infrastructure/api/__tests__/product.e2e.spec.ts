import { app, sequelize } from "../express";
import request from "supertest";

describe("[E2E] product", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    const response = await request(app).post("/product").send({
      name: "any_product",
      price: 100,
    });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe("any_product");
    expect(response.body.price).toBe(100);
  });

  it("should not create a product", async () => {
    const response = await request(app).post("/product").send({
      name: "any_product",
    });
    expect(response.status).toBe(500);
  });

  it("should list all product", async () => {
    const response1 = await request(app).post("/product").send({
      name: "any_product_1",
      price: 70,
    });

    expect(response1.status).toBe(200);
    expect(response1.body.name).toBe("any_product_1");
    expect(response1.body.price).toBe(70);

    const response2 = await request(app).post("/product").send({
      name: "any_product_2",
      price: 100,
    });

    expect(response2.status).toBe(200);
    expect(response2.body.name).toBe("any_product_2");
    expect(response2.body.price).toBe(100);

    const listResponse = await request(app).get("/product").send();

    expect(listResponse.status).toBe(200);
    expect(listResponse.body.products.length).toBe(2);

    const product1 = listResponse.body.products[0];
    expect(product1.name).toBe("any_product_1");
    expect(product1.price).toBe(70);

    const product2 = listResponse.body.products[1];
    expect(product2.name).toBe("any_product_2");
    expect(product2.price).toBe(100);
  });
});
