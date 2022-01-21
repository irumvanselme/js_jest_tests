const request = require("supertest");
const app = require("../app");

describe("Tutorials APIs Tests", () => {
    it("GET /api/tutorials --> an array of tutorials", async () => {
        let res = await request(app)
            .get("/api/tutorials")
            .expect("Content-type", /json/)
            .expect(200);

        expect(res.body).toEqual([]);
    });
});
