/*По данному числу N определите количество последовательностей из нулей и единиц длины N, в которых никакие три единицы не стоят рядом.

Формат ввода
Во входном файле написано натуральное число N, не превосходящее 35.

Формат вывода
Выведите количество искомых последовательностей. Гарантируется, что ответ не превосходит 2^31-1.*/
const fs = require('fs');
let arr = fs.readFileSync('input.txt', 'utf8').split(/\s/gu).filter(Boolean)
arr = arr.map((x)=> parseInt(x, 10))

let n = arr.shift()

let dp = []

dp[0] = 0
dp[1] = 2
dp[2] = 4
dp[3] = 7
for (let i = 4; i<=n; i++){
    dp[i] = dp[i-1] + dp[i-2] + dp[i-3]
}

process.stdout.write(dp[n].toString())
process.exit()