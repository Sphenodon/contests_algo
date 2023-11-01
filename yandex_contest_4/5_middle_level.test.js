const findDissatisfactionLevels = require('./5_middle_level.js')

test("findDissatisfactionLevels", () => {
    expect(findDissatisfactionLevels(3,[1,3,4]))
        .toBe('5 3 4');
});

test("findDissatisfactionLevels", () => {
    expect(findDissatisfactionLevels(5,[3,7,8,10,15]))
        .toBe('28 16 15 17 32');
});