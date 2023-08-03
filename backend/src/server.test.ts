import request from "supertest";
import { app } from "./server";
import { response } from "express";
import axios from "axios";

describe("get /scrape", () => {
  it("should return an array of audiobooks", async () => {
    const res = await request(app).get("/scrape");
    expect(response.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
  it("should handle errors and return 500 status code", async () => {
    jest.spyOn(axios, "get").mockRejectedValue(new Error("Mocked error"));

    const response = await request(app).get("/scrape");
    expect(response.status).toBe(500);
    expect(response.body.error).toBe("Internal Server Error");
  });
});
