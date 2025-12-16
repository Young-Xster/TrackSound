const request = require("supertest");
const app = require("../src/app");
const db = require("./setup");
const jwt = require("jsonwebtoken");
const youtubeService = require("../src/services/youtubeService");

jest.mock("../src/services/youtubeService");

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

describe("Track Endpoints", () => {
  beforeEach(async () => {
    // Create user first
    await request(app).post("/api/auth/signup").send({
      username: "trackuser",
      email: "track@example.com",
      password: "Password123#",
    });

    const res = await request(app).post("/api/auth/signin").send({
      email: "track@example.com",
      password: "Password123#",
    });
    token = res.body.token;
  });

  it("should search for tracks", async () => {
    youtubeService.searchTracks.mockResolvedValue([
      { title: "Mock Song", youtubeId: "12345", duration: 200 },
    ]);

    const res = await request(app)
      .get("/api/tracks/search?query=test")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body[0].title).toBe("Mock Song");
    expect(youtubeService.searchTracks).toHaveBeenCalled();
  });

  it("should add a track to library", async () => {
    const res = await request(app)
      .post("/api/tracks/library")
      .set("Authorization", `Bearer ${token}`)
      .send({
        videoId: "vid123",
        title: "Cool Song",
        artist: "Cool Artist",
        duration: 180,
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body.track.title).toBe("Cool Song");
  });
});
