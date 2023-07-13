/*Дана прямоугольная доска N × M (N строк и M столбцов). В левом верхнем углу находится шахматный конь, которого необходимо переместить в правый нижний угол доски. В данной задаче конь может перемещаться на две клетки вниз и одну клетку вправо или на одну клетку вниз и две клетки вправо.

Необходимо определить, сколько существует различных маршрутов, ведущих из левого верхнего в правый нижний угол.

Формат ввода
Входной файл содержит два натуральных числа N и M , .

Формат вывода
В выходной файл выведите единственное число — количество способов добраться конём до правого нижнего угла доски.*/
const fs = require('fs');
let arr = fs.readFileSync('input.txt', 'utf8').split(/[\r\n]/gu).filter(Boolean)

let size = arr.shift().split(' ').map((x)=> parseInt(x,10))
let i_arr = size[0]
let j_arr = size[1]

for (let i in arr){
    arr[i] = arr[i].split(' ').map((x)=> parseInt(x,10))
}

let dp = [[]]
dp[0] = Array(j_arr+1).fill(0)
for (let i of Array(i_arr).keys()){
    dp.push(Array(j_arr+1).fill(0))
}

dp[1][1] = 1

for (let i = 2; i<=i_arr; i++){
    for (let j = 2; j<=j_arr; j++){
        dp[i][j] = dp[i-1][j-2] + dp[i-2][j-1]
    }
}

process.stdout.write(dp[i_arr][j_arr].toString())
process.exit()