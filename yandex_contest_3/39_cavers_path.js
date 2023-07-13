/*Пещера представлена кубом, разбитым на N частей по каждому измерению (то есть на N^3 кубических клеток). Каждая клетка может быть или пустой, или полностью заполненной камнем. Исходя из положения спелеолога в пещере, требуется найти, какое минимальное количество перемещений по клеткам ему требуется, чтобы выбраться на поверхность. Переходить из клетки в клетку можно, только если они обе свободны и имеют общую грань.

Формат ввода
В первой строке содержится число N (1 ≤ N ≤ 30). Далее следует N блоков. Блок состоит из пустой строки и N строк по N символов: # - обозначает клетку, заполненную камнями, точка - свободную клетку. Начальное положение спелеолога обозначено заглавной буквой S. Первый блок представляет верхний уровень пещеры, достижение любой свободной его клетки означает выход на поверхность. Выход на поверхность всегда возможен.

Формат вывода
Вывести одно число - длину пути до поверхности.*/
const fs = require('fs');
let arr = fs.readFileSync('input.txt', 'utf8').split(/[\r\n]/gu).filter(Boolean)

let n = parseInt(arr.shift())

let cave = []
let sOuter = -1
let sInner = -1
let sLevel = -1

for (let i = 0; i < n; i++) {
    cave[i] = []
    for (let j = 0; j < n; j++) {
        let chars = arr.shift()
        cave[i][j] = chars.split('')
        let s = chars.indexOf('S')
        if (s !== -1) {
            sOuter = i
            sInner = j
            sLevel = s
        }
    }
}

let visited = []
for (let i = 0; i < n; i++) {
    visited[i] = []
    for (let j = 0; j < n; j++) {
        visited[i].push(Array(n))
    }
}
let distances = []
for (let i = 0; i < n; i++) {
    distances[i] = []
    for (let j = 0; j < n; j++) {
        distances[i].push(Array(n).fill(Infinity))
    }
}

distances[sOuter][sInner][sLevel] = 0

function getAdj(current, cave) {
    let yAxis = [-1, 1, 0, 0, 0, 0]
    let xAxis = [0, 0, -1, 1, 0, 0]
    let zAxis = [0, 0, 0, 0, -1, 1]
    let result = []
    for (let i = 0; i < 6; i++) {
        let yy = yAxis[i] + current[0]
        let xx = xAxis[i] + current[1]
        let zz = zAxis[i] + current[2]
        if (yy >= cave.length || xx >= cave[0].length || zz >= cave[0][0].length
            || yy < 0 || xx < 0 || zz < 0) {
            continue
        }
        if (cave[yy][xx][zz] === '.'){
            result.push([yy, xx, zz])
        }
    }
    return result
}
function bfs(o, i, l){
    visited[o][i][l] = true
    let queue = []
    queue.push([o, i, l])
    while (queue.length > 0) {
        let current = queue.shift()
        let adj = getAdj(current, cave)
        for (let p of adj) {
            if (visited[p[0]][p[1]][p[2]] !== true) {
                if (distances[p[0]][p[1]][p[2]] > distances[current[0]][current[1]][current[2]] + 1) {
                    distances[p[0]][p[1]][p[2]] = distances[current[0]][current[1]][current[2]] + 1
                }
                queue.push(p)
                visited[p[0]][p[1]][p[2]] = true
            }
        }
    }
}

bfs(sOuter, sInner, sLevel)
let top = distances[0]
let min = Infinity
for (let arr of top){
    for (let path of arr){
        min = Math.min(min, path)
    }
}

process.stdout.write(min.toString())
process.exit()
