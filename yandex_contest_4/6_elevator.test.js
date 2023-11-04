const findTransportationTime = require('./6_elevator.js')

test("findTransportationTime", () => {
    expect(findTransportationTime(2, [3, 0, 1]))
        .toBe(8);
});

test("findDissatisfactionLevels", () => {
    expect(findTransportationTime(3,  [0, 2, 2, 0, 0, 0, 2, 2, 0, 2, 0, 0, 1, 0, 0, 2, 0, 0, 2, 2, 0, 0, 2, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 2, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 2, 0, 0, 0, 2, 0, 0, 0, 2, 0, 1, 0, 1, 0, 2, 2, 1, 2, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 2, 0, 2, 0, 2, 0, 1, 0, 0, 2, 0, 2, 1, 2, 0, 1, 0,]))
        .toBe(2286);
});

