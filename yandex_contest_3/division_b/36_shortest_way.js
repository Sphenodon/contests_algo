/*В неориентированном графе требуется найти длину минимального пути между двумя вершинами.

Формат ввода
Первым на вход поступает число N – количество вершин в графе (1 ≤ N ≤ 100). Затем записана матрица смежности (0 обозначает отсутствие ребра, 1 – наличие ребра). Далее задаются номера двух вершин – начальной и конечной.

Формат вывода
Выведите L – длину кратчайшего пути (количество ребер, которые нужно пройти).

Если пути нет, нужно вывести -1.*/
const fs = require('fs');
let arr = fs.readFileSync('input.txt', 'utf8').split(/[\r\n]/gu).filter(Boolean)

let n = parseInt(arr.shift())
let a_b = arr.pop().split(' ').map((x) => parseInt(x))
let start = a_b[0]
let end = a_b[1]
let cohesion = {}

for (let i = 0; i<n; i++){
    let vertices = arr[i].split(' ').map((x) => parseInt(x))
    for (let j = 0; j<n; j++){
        cohesion[i+1] ??= []
        if (vertices[j] === 1) cohesion[i+1].push(j+1)
    }
}
// console.log(cohesion)
let visited = {}
let stack = []

function bfs(now, end){
    if (visited[end] || now === undefined) return
    for (let i = 0; i < cohesion[now].length; i++) {
        if (visited[cohesion[now][i]] === undefined) {
            stack.push(cohesion[now][i])
            visited[cohesion[now][i]] = visited[now] + 1
        }
    }
    now = stack.shift()
    bfs(now, end)
}

visited[start] = 0
bfs(start, end)

if (visited[end] !== undefined){
    process.stdout.write(visited[end].toString())
    process.exit()
}

process.stdout.write('-1')
process.exit()