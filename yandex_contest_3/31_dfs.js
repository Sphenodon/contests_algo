/*Дан неориентированный граф, возможно, с петлями и кратными ребрами. Необходимо построить компоненту связности, содержащую первую вершину.

Формат ввода
В первой строке записаны два целых числа N (1 ≤ N ≤ 10^3) и M (0 ≤ M ≤ 5 * 10^5) — количество вершин и ребер в графе. В последующих M строках перечислены ребра — пары чисел, определяющие номера вершин, которые соединяют ребра.

Формат вывода
В первую строку выходного файла выведите число K — количество вершин в компоненте связности. Во вторую строку выведите K целых чисел — вершины компоненты связности, перечисленные в порядке возрастания номеров.*/
const fs = require('fs');
// let time = performance.now()
let arr = fs.readFileSync('input.txt', 'utf8').split(/[\r\n]/gu).filter(Boolean)

let n_m = arr.shift().split(' ').map((x) => parseInt(x))
let n = n_m[0]
let m = n_m[1]
let cohesion = {}
for (let i = 0; i<m; i++){
    let vertices = arr[i].split(' ').map((x) => parseInt(x))
    cohesion[vertices[0]] ??= []
    cohesion[vertices[0]].push(vertices[1])
    cohesion[vertices[1]] ??= []
    cohesion[vertices[1]].push(vertices[0])
}
// time = performance.now() - time
// console.log(time)
// console.log(cohesion)
let component_cohesion = {}
let visited = {}

function dfs(graph, visited, now){
    visited[now] = true
    component_cohesion[now] ??= []
    let graph_now = graph[now] === undefined ? '1' : graph[now]

    for (let neig of graph_now){
        if (!visited[neig]){
            component_cohesion[now] += [neig]
            dfs(graph, visited, neig)
        }
    }
}

dfs(cohesion, visited, 1)
// time = performance.now() - time
// console.log(time)
// console.log(component_cohesion)
process.stdout.write(Object.keys(component_cohesion).length.toString() + '\n')
process.stdout.write(Object.keys(component_cohesion).toString().replaceAll(',',' '))
process.exit()
