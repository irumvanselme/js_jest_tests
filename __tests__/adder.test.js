const adder = require("../utils/adder");

describe("Adder Function", () => {
    it("Should return zero on an error", () => {
        expect(adder()).toBe(0);
    });
    it("Should add one number", () => {
        expect(adder(1)).toBe(1);
    });
    it("Should add two number", () => {
        expect(adder(1, 2)).toBe(3);
    });
    it("Should add five number", () => {
        expect(adder(1, 2, 3, 4, 5)).toBe(15);
    });
});
