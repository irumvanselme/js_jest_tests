const adder = require("../app/utils/adder");

describe("Adder function", () => {
    it("Should return zero for an empty data", () => {
        expect(adder()).toEqual(0);
    });
});
