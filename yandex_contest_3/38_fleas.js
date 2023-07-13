/*На клеточном поле, размером NxM (2 ≤ N, M ≤ 250) сидит Q (0 ≤ Q ≤ 10000) блох в различных клетках. "Прием пищи" блохами возможен только в кормушке - одна из клеток поля, заранее известная. Блохи перемещаются по полю странным образом, а именно, прыжками, совпадающими с ходом обыкновенного шахматного коня. Длина пути каждой блохи до кормушки определяется как количество прыжков. Определить минимальное значение суммы длин путей блох до кормушки или, если собраться блохам у кормушки невозможно, то сообщить об этом. Сбор невозможен, если хотя бы одна из блох не может попасть к кормушке.

Формат ввода
В первой строке входного файла находится 5 чисел, разделенных пробелом: N, M, S, T, Q. N, M - размеры доски (отсчет начинается с 1); S, T - координаты клетки - кормушки (номер строки и столбца соответственно), Q - количество блох на доске. И далее Q строк по два числа - координаты каждой блохи.

Формат вывода
Содержит одно число - минимальное значение суммы длин путей или -1, если сбор невозможен.*/
const fs = require('fs');
let arr = fs.readFileSync('input.txt', 'utf8').split(/[\r\n]/gu).filter(Boolean)

let n_m_s_t_q = arr.shift().split(' ').map((x) => parseInt(x))
let [n, m, s, t, q] = [n_m_s_t_q[0], n_m_s_t_q[1], n_m_s_t_q[2], n_m_s_t_q[3], n_m_s_t_q[4]]

let coords = []

for (let i = 0; i<q; i++){
    let vertices = arr[i].split(' ').map((x) => parseInt(x))
    coords.push(vertices)
}
// console.log(coords)
let visited = []
for (let i = 0; i <= n; i++) {
    visited.push(Array(m+1))
}
let distances = []
for (let i = 0; i <= n; i++) {
    distances.push(Array(m+1).fill(Infinity))
}

distances[s][t] = 0

function getAdj(n, m, row, col) {
    let rows = [-1, -2, 1, 2, -1, -2, 1, 2]
    let cols = [-2, -1, -2, -1, 2, 1, 2, 1]
    let res = []
    for (let i = 0; i < 8; i++) {
        let r = rows[i]
        let c = cols[i]
        if (1 <= r + row && r + row <= n && 1 <= c + col && c + col <= m) {
            res.push([r + row, c + col])
        }
    }
    return res
}
function bfs(row, col){
    visited[row] = []
    visited[row][col] = true
    let queue = []
    queue.push([row,col])
    while (queue.length > 0) {
        let current = queue.shift()
        let adj = getAdj(n, m, current[0], current[1])
        for (let p of adj) {
            if (visited[p[0]][p[1]] !== true) {
                if (distances[p[0]][p[1]] > distances[current[0]][current[1]] + 1) {
                    distances[p[0]][p[1]] = distances[current[0]][current[1]] + 1
                }
                queue.push(p)
                visited[p[0]][p[1]] = true
            }
        }
    }
}

let result = 0
bfs(s, t)

for (let coord of coords) {
    if (distances[coord[0]][coord[1]] === Infinity) {
        process.stdout.write('-1')
        process.exit()
    } else {
        result += distances[coord[0]][coord[1]]
    }
}

process.stdout.write(result.toString())
process.exit()

