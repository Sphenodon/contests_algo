/*Красотой строки назовем максимальное число идущих подряд одинаковых букв. (красота строки abcaabdddettq равна 3)

Сделайте данную вам строку как можно более красивой, если вы можете сделать не более k операций замены символа.

Формат ввода
В первой строке записано одно целое число k (0 ≤ k ≤ 109)

Во второй строке дана непустая строчка S (|S| ≤ 2 ⋅ 105). Строчка S состоит только из маленьких латинских букв.

Формат вывода
Выведите одно число — максимально возможную красоту строчки, которую можно получить.*/

const fs = require('fs');
let s = fs.readFileSync('input.txt', 'utf8').split(/\s/gu);

let k = parseInt(s[0]);
let nice_line = s[2];

let start = 0;
let frequencyMap = new Map();
let maxFrequency = 0;
let longestSubstringLength = 0;

for (let end = 0; end < nice_line.length; end += 1) {
    frequencyMap[nice_line[end]] ||= 0;
    frequencyMap[nice_line[end]] += 1;

    maxFrequency = Math.max(maxFrequency, frequencyMap[nice_line[end]]);

    const isValid = end + 1 - start - maxFrequency <= k;
    if (!isValid){
        frequencyMap[nice_line[start]] -= 1;
        start += 1;
    }

    longestSubstringLength = end + 1 - start;
}


fs.writeFileSync('output.txt', longestSubstringLength.toString(), function(error){
    if(error) throw error;
});