/*Даны две рациональные дроби: a/b и c/d. Сложите их и результат представьте в виде несократимой дроби m/n.

Формат ввода
Программа получает на вход 4 натуральных числа a, b, c, d, каждое из которых не больше 100.

Формат вывода
Программа должна вывести два натуральных числа m и n такие, что m/n=a/b+c/d и дробь m/n – несократима.
*/
const fs = require('fs');
let arr = fs.readFileSync('input.txt', 'utf8').split(/[ \r\n]/gu).filter(Boolean)

const a = parseInt(arr[0])
const b = parseInt(arr[1])
const c = parseInt(arr[2])
const d = parseInt(arr[3])

let m = 0
let n = 0
let answer = ''

m = a*d + c*b
n = b*d

// Функция для вычисления НОД (наибольшего общего делителя)
function gcd(a, b) {
    while (b) {
        let temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

const gcdResult = gcd(m,n)
answer += `${m/gcdResult} ${n/gcdResult}`

fs.writeFileSync('output.txt', answer.toString(), function(error){
    if(error) throw error;
});