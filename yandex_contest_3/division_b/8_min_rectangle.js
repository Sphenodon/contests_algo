/*На клетчатой плоскости закрашено K клеток. Требуется найти минимальный по площади прямоугольник, со сторонами, параллельными линиям сетки, покрывающий все закрашенные клетки.

Формат ввода
Во входном файле, на первой строке, находится число K (1 ≤ K ≤ 100). На следующих K строках находятся пары чисел Xi и Yi – координаты закрашенных клеток (|Xi|, |Yi| ≤ 109).

Формат вывода
Выведите в выходной файл координаты левого нижнего и правого верхнего углов прямоугольника.*/
const fs = require('fs');
let arr = fs.readFileSync('input.txt', 'utf8').split(/\s/gu).filter(Boolean)
arr = arr.map((x)=> parseInt(x, 10))

let k = arr.shift()
let coordinates = arr
let x_arr = []
let y_arr = []
let answer = []

while (coordinates.length){
    y_arr.push(coordinates.pop())
    x_arr.push(coordinates.pop())
}

answer.push(Math.min(...x_arr))
answer.push(Math.min(...y_arr))
answer.push(Math.max(...x_arr))
answer.push(Math.max(...y_arr))

process.stdout.write(answer.toString().replaceAll(',', ' '))
process.exit()