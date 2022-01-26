module.exports = function adder(...items) {
    let sum = 0;
    for (let item in items) sum += parseInt(item);
    return sum;
};
