module.exports = function adder(...items) {
    let sum = 0;

    for (let i of items) sum += i;

    return sum;
};
