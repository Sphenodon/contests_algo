/*Рассмотрим последовательность, состоящую из круглых, квадратных и фигурных скобок. Программа дожна определить, является ли данная скобочная последовательность правильной. Пустая последовательность явлется правильной. Если A – правильная, то последовательности (A), [A], {A} – правильные. Если A и B – правильные последовательности, то последовательность AB – правильная.

Формат ввода
В единственной строке записана скобочная последовательность, содержащая не более 100000 скобок.

Формат вывода
Если данная последовательность правильная, то программа должна вывести строку yes, иначе строку no.*/
const fs = require('fs');
let s = fs.readFileSync('input.txt', 'utf8').replaceAll(/\s/gu, '')

let stack = []
let bracket_pair = new Map()
bracket_pair.set('(', ')')
bracket_pair.set('[', ']')
bracket_pair.set('{', '}')

if (s.length === 1 || s.length%2 === 1) {
    process.stdout.write('no')
    process.exit()
}

for (let l of s){
    if (bracket_pair.has(l)){
        stack.push(l)
        continue
    }
    if (bracket_pair.get(stack.pop()) !== l){
        process.stdout.write('no')
        process.exit()
    }
}

process.stdout.write('yes')
process.exit()