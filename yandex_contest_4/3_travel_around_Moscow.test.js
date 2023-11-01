const findDistance = require('./3_travel_around_Moscow.js')

test("0 0 0 0\n", () => {
    expect(findDistance(0, 0, 0, 0))
        .toBeCloseTo(0);
});

test("0 5 4 3\n", () => {
    expect(findDistance(0, 5, 4, 3))
        .toBeCloseTo(4.63647609000);
});

test("0 5 4 -3\n", () => {
    expect(findDistance(0, 5, 4, -3))
        .toBeCloseTo(10.000000000000);
});

test("1000000 -372066 -999998 -1000000\n", () => {
    expect(findDistance(1000000, -372066, -999998, -1000000))
        .toBeCloseTo(2481183.366012966726);
});
