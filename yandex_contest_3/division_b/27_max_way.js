/*В левом верхнем углу прямоугольной таблицы размером N×M находится черепашка. В каждой клетке таблицы записано некоторое число. Черепашка может перемещаться вправо или вниз, при этом маршрут черепашки заканчивается в правом нижнем углу таблицы.
Подсчитаем сумму чисел, записанных в клетках, через которую проползла черепашка (включая начальную и конечную клетку). Найдите наибольшее возможное значение этой суммы и маршрут, на котором достигается эта сумма.

Формат ввода
В первой строке входных данных записаны два натуральных числа N и M, не превосходящих 100 — размеры таблицы. Далее идет N строк, каждая из которых содержит M чисел, разделенных пробелами — описание таблицы. Все числа в клетках таблицы целые и могут принимать значения от 0 до 100.
Формат вывода
Первая строка выходных данных содержит максимальную возможную сумму, вторая — маршрут, на котором достигается эта сумма. Маршрут выводится в виде последовательности, которая должна содержать N-1 букву D, означающую передвижение вниз и M-1 букву R, означающую передвижение направо. Если таких последовательностей несколько, необходимо вывести ровно одну (любую) из них.*/
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

for (let i = 1; i<=i_arr; i++){
    for (let j = 1; j<=j_arr; j++){
        dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]) + arr[i-1][j-1]
    }
}

let i = i_arr
let j = j_arr
let moves = ''
while (i>0 && j>0){
    Math.max(dp[i-1][j], dp[i][j-1]) === dp[i-1][j] ? moves = `D ${moves}` : moves = `R ${moves}`
    Math.max(dp[i-1][j], dp[i][j-1]) === dp[i-1][j] ? i-- : j--
}

process.stdout.write(dp[i_arr][j_arr].toString()+'\n')
process.stdout.write(moves.slice(2))
process.exit()