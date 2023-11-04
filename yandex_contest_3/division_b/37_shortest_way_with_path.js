/*В неориентированном графе требуется найти минимальный путь между двумя вершинами.

Формат ввода
Первым на вход поступает число N – количество вершин в графе (1 ≤ N ≤ 100). Затем записана матрица смежности (0 обозначает отсутствие ребра, 1 – наличие ребра). Далее задаются номера двух вершин – начальной и конечной.

Формат вывода
Выведите сначала L – длину кратчайшего пути (количество ребер, которые нужно пройти), а потом сам путь. Если путь имеет длину 0, то его выводить не нужно, достаточно вывести длину.

Необходимо вывести путь (номера всех вершин в правильном порядке). Если пути нет, нужно вывести -1.*/
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
let visited_path = {}
let stack = []

function bfs(now, end){
    if (visited[end] || now === undefined) return
    for (let i = 0; i < cohesion[now].length; i++) {
        if (visited[cohesion[now][i]] === undefined) {
            stack.push(cohesion[now][i])
            visited[cohesion[now][i]] = visited[now] + 1
            visited_path[cohesion[now][i]] = now
        }
    }
    now = stack.shift()
    bfs(now, end)
}

visited[start] = 0
visited_path[start] = -1
bfs(start, end)

let answer = [end]
let end_for_answer = end
if (visited[end_for_answer] !== undefined){
    process.stdout.write(visited[end_for_answer].toString() + '\n')
    for (let i = visited[end_for_answer]; i>0; i--){
        answer.push(visited_path[end_for_answer])
        end_for_answer = visited_path[end_for_answer]
    }
    if (answer.length>1) process.stdout.write(answer.reverse().toString().replaceAll(',', ' '))
    process.exit()
}

process.stdout.write('-1')
process.exit()