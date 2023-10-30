/*Задана последовательность целых чисел a1, a2, …, an. Задаются запросы: сказать любой элемент последовательности на отрезке от L до R включительно, не равный минимуму на этом отрезке.

Формат ввода
В первой строке содержатся два целых числа N, 1 ≤ N ≤ 100 и M, 1 ≤ M ≤ 1000 — длина последовательности и количество запросов соответственно.

Во второй строке — сама последовательность, 0 ≤ ai ≤ 1000.

Начиная с третьей строки перечисляются M запросов, состоящих из границ отрезка L и R, где L, R - индексы массива, нумеруются с нуля.

Формат вывода
На каждый запрос выведите в отдельной строке ответ — любой элемент на [L, R], кроме минимального. В случае, если такого элемента нет, выведите "NOT FOUND".
*/
const fs = require('fs');
let arr = fs.readFileSync('input.txt', 'utf8').split(/[\r\n]/gu).filter(Boolean)

const numberOfRequests = parseInt(arr.shift().split(/ /)[1])
const sequence = arr.shift().split(/ /).map((x)=> parseInt(x, 10))
let answer = '';

for (const indexes of arr) {
    const arrIndexes = indexes.split(/ /).map((x)=> parseInt(x, 10))
    const lIndex = arrIndexes[0]
    const rIndex = arrIndexes[1]
    let subSequence = sequence.slice(lIndex, rIndex+1)
    subSequence.sort((a,b) => a-b)
    if (subSequence[0] !== subSequence[subSequence.length - 1]) {
        answer += `${subSequence[subSequence.length - 1]}\r\n`
    }else answer += 'NOT FOUND\r\n'
}

fs.writeFileSync('output.txt', answer.toString(), function(error){
    if(error) throw error;
});