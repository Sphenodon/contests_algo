const isThisAnAnagram = require('./4_anagram.js')

test("should be an anagram", () => {
    expect(isThisAnAnagram('dusty','study'))
        .toBe('YES');
});

test("shouldn't be an anagram", () => {
    expect(isThisAnAnagram('rat','bat'))
        .toBe('NO');
});
