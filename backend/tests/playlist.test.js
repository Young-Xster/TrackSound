const request = require("supertest");
const app = require("../src/app");
const db = require("./setup");
const jwt = require("jsonwebtoken");

let token;

beforeAll(async () => {
  await db.connect();
});
afterEach(async () => {
  await db.clear();
});
afterAll(async () => {
  await db.close();
});

const getAuthToken = async () => {
  // Create user first
  await request(app).post("/api/auth/signup").send({
    username: "playlistuser",
    email: "playlist@example.com",
    password: "Password123#",
  });

  const res = await request(app).post("/api/auth/signin").send({
    email: "playlist@example.com",
    password: "Password123#",
  });
  return res.body.token;
};

describe("Playlist Endpoints", () => {
  it("should create a new playlist", async () => {
    token = await getAuthToken();

    const res = await request(app)
      .post("/api/playlists")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "My Playlist",
        isPublic: true,
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body.name).toBe("My Playlist");
  });

  it("should get user playlists", async () => {
    token = await getAuthToken();

    await request(app)
      .post("/api/playlists")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Gym Hits",
        isPublic: true,
      });

    const res = await request(app)
      .get("/api/playlists")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
    expect(res.body.length).toBe(1);
    expect(res.body[0].name).toBe("Gym Hits");
  });
});
