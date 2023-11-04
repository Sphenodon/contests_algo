/*Имеется калькулятор, который выполняет следующие операции:

умножить число X на 2;
умножить число X на 3;
прибавить к числу X единицу.
Определите, какое наименьшее количество операций требуется, чтобы получить из числа 1 число N.

Формат ввода
Во входном файле написано натуральное число N, не превосходящее 106.

Формат вывода
В первой строке выходного файла выведите минимальное количество операций. Во второй строке выведите числа, последовательно получающиеся при выполнении операций. Первое из них должно быть равно 1, а последнее N. Если решений несколько, выведите любое.*/
const fs = require('fs');
let arr = fs.readFileSync('input.txt', 'utf8').split(/\s/gu).filter(Boolean)
arr = arr.map((x)=> parseInt(x, 10))

let n = arr.shift()

let dp = []

dp[0] = 0
dp[1] = 0

for (let i = 2; i<=n; i++){
    let minimal = dp[i-1] + 1
    if (i%2===0){
        minimal = Math.min(minimal, dp[i/2] + 1)
    }
    if (i%3===0){
        minimal = Math.min(minimal, dp[i/3] + 1)
    }
    dp[i] = minimal
}

let operations = []
let num = n
while (num >= 1){
    if (dp[num] === dp[num-1] + 1){
        operations.unshift(num)
        num -= 1
        continue
    }
    if (num%2 === 0 && dp[num] === dp[num/2] + 1){
        operations.unshift(num)
        num /= 2
        continue
    }
    operations.unshift(num)
    num /= 3
}


process.stdout.write(dp[n].toString() + '\n')
process.stdout.write(operations.toString().replaceAll(',', ' '))
process.exit()