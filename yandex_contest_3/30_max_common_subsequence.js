/*Даны две последовательности, требуется найти и вывести их наибольшую общую подпоследовательность.

Формат ввода
В первой строке входных данных содержится число N – длина первой последовательности (1 ≤ N ≤ 1000). Во второй строке заданы члены первой последовательности (через пробел) – целые числа, не превосходящие 10000 по модулю.

В третьей строке записано число M – длина второй последовательности (1 ≤ M ≤ 1000). В четвертой строке задаются члены второй последовательности (через пробел) – целые числа, не превосходящие 10000 по модулю.

Формат вывода
Требуется вывести наибольшую общую подпоследовательность данных последовательностей, через пробел.*/
const fs = require('fs');
let arr = fs.readFileSync('input.txt', 'utf8').split(/[\r\n]/gu).filter(Boolean)

let n = parseInt(arr.shift())
let x = arr.shift().split(' ').map((x)=> parseInt(x,10))
x.unshift(0)
let m = parseInt(arr.shift())
let y = arr.shift().split(' ').map((x)=> parseInt(x,10))
y.unshift(0)

// console.log(x)
// console.log(y)
let dp = [];
for (let i = 0; i<=n; i++){
    dp[i] = Array(m+1).fill(0)
}

for(let i = 1; i <= n; i++){
    for(let j = 1; j <= m; j++){
        if (x[i] === y[j]){
            dp[i][j] = 1 + dp[i-1][j-1]
        }else {
            dp[i][j] = Math.max(dp[i-1][j],dp[i][j-1])
        }
    }
}

// console.log(dp[n])
let answer = ['']
while (n && m){
    if (x[n] === y[m]) {
        answer.push(x[n])
        n--
        m--
    }
    else{
        if (dp[n - 1][m] === dp[n][m]){
            n--
        } else{
            m--
        }
    }
}

process.stdout.write(answer.reverse().toString().replaceAll(',', ' '))
process.exit()

