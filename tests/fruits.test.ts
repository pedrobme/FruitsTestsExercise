import app from "index";
import { Fruit } from "repositories/fruits-repository";
import supertest from "supertest";

const api = supertest(app);


describe("GET /fruits", () => {
  it("Should respond with status 200 and fruits data", async () => {
    const response = await api.get("/fruits");

    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          name: expect.any(String),
          price: expect.any(Number),
        }),
      ])
    );
  });
});

describe("GET /fruits/:id", () => {
  it("Should respond with status 200 and fruit data", async () => {
    const response = await api.get("/fruits/5");

    expect(response.body).toEqual({
      id: expect.any(Number),
      name: expect.any(String),
      price: expect.any(Number),
    });
  });

  it("Should respond with status 404 if fruit id does not exist", async () => {
    const response = await api.get("/fruits/-1");

    expect(response.status).toBe(404);
  });
});

describe("POST /fruits", () => {
  it("Should respond with status 201 and fruit data", async () => {
    const response = await api.post("/fruits").send({
      price: 1.5,
      name: "tamarindo",
    } as Fruit);

    expect(response.status).toBe(201);
  });

  it("Should respond with status 409 if fruit already exists", async () => {
    const response = await api.post("/fruits").send({
      price: 1.5,
      name: "Banana",
    } as Fruit);

    expect(response.status).toBe(409);
  });
});
