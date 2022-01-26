const adder = require("../app/utils/adder");

describe("Adder function", () => {
    it("Should return zero for an empty array", () => {
        expect(adder([])).toEqual(0);
    });
});
