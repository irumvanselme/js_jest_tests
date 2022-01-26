const request = require("supertest");
const chai = require("chai");
const http = require("chai-http");

const { expect } = chai;

const db = require("../app/models");
const Tutorial = db.tutorials;
const app = require("../app");

chai.use(http);

describe("Get endpoint", () => {
    let data = [
        {
            _id: "4882200e85yytii999",
            title: "react native",
            description: "first course",
            published: true,
        },
        {
            _id: "4882200e85ytteeetii999",
            title: "ionic",
            description: "mobile development",
            published: true,
        },
    ];
    let emptyArr = [];
    test("should return 200 on sucess", async () => {
        jest.spyOn(Tutorial, "find").mockReturnValue(Promise.resolve(data));
        const res = await chai.request(app).get("/api/tutorials");
        expect(res.status).to.equal(200);
    });

    test("should return title at index 0 of the body returned", async () => {
        jest.spyOn(Tutorial, "find").mockReturnValue(Promise.resolve(data));
        const res = await chai.request(app).get("/api/tutorials");
        expect(res.body[0].title).to.equal("react native");
    });
    test("should return 404 if there is no empty data", async () => {
        jest.spyOn(Tutorial, "find").mockReturnValue(Promise.resolve(emptyArr));
        const res = await chai.request(app).get("/api/tutorials");
        expect(res.status).to.equal(404);
    });
});

describe("Put endpoint", () => {
    let updatedTurtorial = {
        _id: "4665ytuugi86886000",
        title: "react native",
        description: "mobile development",
        published: false,
    };

    test("should return 201 if the turtorial is updated", async () => {
        jest.spyOn(Tutorial, "findByIdAndUpdate").mockReturnValue(
            Promise.resolve(updatedTurtorial)
        );
        const res = await chai
            .request(app)
            .put("/api/tutorials/:4665ytuugi86886000");
        expect(res.body.message).to.equal("Tutorial was updated successfully.");
    });
    test("should return 404 if no data was given", async () => {
        jest.spyOn(Tutorial, "findByIdAndUpdate").mockReturnValue(
            Promise.resolve(null)
        );
        const res = await chai
            .request(app)
            .put("/api/tutorials/:4665ytuugi86886000");
        expect(res.body.message).to.equal("Not Found");
    });
});
describe("Post endpoints", () => {
    it("should create tutorial successfully", async () => {
        jest.spyOn(Tutorial, "create").mockReturnValue(Promise.resolve(true));

        const res = await request(app).post("/api/tutorials/").send({
            title: "Test tutorial",
            description: "Test tutorial description",
            published: true,
        });

        expect(res.statusCode).to.equal(201);
    });
    it("should not create tutorial if title is missing", async () => {
        const res = await request(app).post("/api/tutorials/").send({
            title: "",
            description: "Test tutorial description",
            published: true,
        });
        expect(res.statusCode).to.equal(400);
        expect(res.body.message).to.equal("Title can not be empty!");
    });
});

describe("Delete endpoints", () => {
    it("should delete one tutorial successfully", async () => {
        jest.spyOn(Tutorial, "findByIdAndRemove").mockReturnValue(
            Promise.resolve(true)
        );

        const res = await request(app).post("/api/tutorials/").send({
            title: "Test tutorial",
            description: "Test tutorial description",
            published: true,
        });

        const id = res.body.id;
        const response = await request(app).delete("/api/tutorials/" + id);
        expect(response.statusCode).to.equal(200);
        expect(response.body.message).to.equal(
            "Tutorial was deleted successfully!"
        );
    });

    it("should delete all tutorials successfully", async () => {
        jest.spyOn(Tutorial, "deleteMany").mockReturnValue(
            Promise.resolve(true)
        );
        const response = await request(app).delete("/api/tutorials/");
        expect(response.statusCode).to.equal(200);
        expect(response.body.message).to.equal(
            "Tutorials were deleted successfully!"
        );
    });
});

describe("GET endpoints", () => {
    it("should return tutorial by id successfully", async () => {
        let tutorial = {
            _id: "4665ytuugi86886000",
            title: "Test native",
            description: "mobile development",
            published: false,
        };
        jest.spyOn(Tutorial, "findById").mockReturnValue(
            Promise.resolve(tutorial)
        );
        const response = await request(app).get("/api/tutorials/dSDSAFDSDSDAS");
        expect(response.statusCode).to.equal(200);
        expect(response.body.title).to.equal("Test native");
    });
});
