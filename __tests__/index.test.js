const request = require("supertest");
const app = require("../app");

describe("App tests", () => {
    it("GET / -> renders the index page", async () => {
        let res = await request(app)
            .get("/")
            .expect("Content-type", /json/)
            .expect(200);

        expect(res.body).toEqual({
            message: "Welcome to team three application.",
        });
    });
});
