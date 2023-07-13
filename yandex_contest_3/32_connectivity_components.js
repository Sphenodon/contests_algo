/*Дан неориентированный невзвешенный граф, состоящий из N вершин и M ребер. Необходимо посчитать количество его компонент связности и вывести их.

Формат ввода
Во входном файле записано два числа N и M (0 < N ≤ 100000, 0 ≤ M ≤ 100000). В следующих M строках записаны по два числа i и j (1 ≤ i, j ≤ N), которые означают, что вершины i и j соединены ребром.

Формат вывода
В первой строчке выходного файла выведите количество компонент связности. Далее выведите сами компоненты связности в следующем формате: в первой строке количество вершин в компоненте, во второй - сами вершины в произвольном порядке.*/
const fs = require('fs');
let time = performance.now()
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

let component_cohesion = []
let visited = {}
let stack = []
function dfs(now){
    let i = 0
    dfs_w: while (i<n){
        visited[now] = true
        component_cohesion[res-1] ??= []
        component_cohesion[res-1].push(now)
        let graph_now;

        if (cohesion[now] === undefined) {
            return
        } else {
            graph_now = cohesion[now]
        }

        for (let neig of graph_now) {
            stack.push(neig)
        }
        while (stack.length>0){
            let peak = stack.pop()
            if (!visited[peak]){
                now = peak
                continue dfs_w
            }
        }
        return
    }
}

let res = 0
for (let i = 1; i<=n; i++){
    if (!visited[i]){
        res += 1
        dfs(i)
    }
}

let answer = res + '\n'
for (let i = 0; i<res; i++){
    answer += component_cohesion[i].length + '\n'
    answer += component_cohesion[i].toString().replaceAll(',', ' ')+ '\n'
}


fs.writeFileSync('output.txt', answer, function(error){
    if(error) throw error;
});

time = performance.now() - time
console.log(time)

