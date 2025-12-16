const request = require("supertest");
const app = require("../src/app");
const db = require("./setup");
const jwt = require("jsonwebtoken");

beforeAll(async () => {
  await db.connect();
});
afterEach(async () => {
  await db.clear();
});
afterAll(async () => {
  await db.close();
});

describe("Auth Endpoints", () => {
  it("should register a new user", async () => {
    const res = await request(app).post("/api/auth/signup").send({
      username: "testuser",
      email: "test@example.com",
      password: "Password123#",
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("token");
  });

  it("should login an existing user", async () => {
    // Create user first
    await request(app).post("/api/auth/signup").send({
      username: "testuser",
      email: "test@example.com",
      password: "Password123#",
    });

    const res = await request(app).post("/api/auth/signin").send({
      email: "test@example.com",
      password: "Password123#",
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("token");
  });
});
