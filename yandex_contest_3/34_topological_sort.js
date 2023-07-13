/*Дан ориентированный граф. Необходимо построить топологическую сортировку.

Формат ввода
В первой строке входного файла два натуральных числа N и M (1 ≤ N, M ≤ 100 000) — количество вершин и рёбер в графе соответственно. Далее в M строках перечислены рёбра графа. Каждое ребро задаётся парой чисел — номерами начальной и конечной вершин соответственно.

Формат вывода
Выведите любую топологическую сортировку графа в виде последовательности номеров вершин (перестановка чисел от 1 до N). Если топологическую сортировку графа построить невозможно, выведите -1.*/
const fs = require('fs');
let arr = fs.readFileSync('input.txt', 'utf8').split(/[\r\n]/gu).filter(Boolean)

let n_m = arr.shift().split(' ').map((x) => parseInt(x))
let n = n_m[0]
let m = n_m[1]
let cohesion = {}

for (let i = 0; i<m; i++){
    let vertices = arr[i].split(' ').map((x) => parseInt(x))
    cohesion[vertices[0]] ??= []
    cohesion[vertices[0]].push(vertices[1])
}

let visited = {}
let stack = []
let need_color_stack = []
let answer = []

function change_color(){
    let length_ncs = need_color_stack.length
    for (let i = length_ncs - 1; i >= 0; i--){
        if (need_color_stack[i] === -1){
            need_color_stack.pop()
            return
        }
        let item_ncs = need_color_stack.pop()
        visited[item_ncs] = 2
        if (item_ncs) answer.push(item_ncs)
    }
}

function dfs(now, color){
    dfs_w: while (true){
        visited[now] = color
        need_color_stack.push(now)
        let graph_now = []

        if (cohesion[now] === undefined) {
            if (need_color_stack.length === 0) {
                need_color_stack.push(now)
                return
            }
        } else {
            graph_now = cohesion[now]
        }

        for (let neig of graph_now) {
            if (visited[neig] === 1){
                process.stdout.write('-1')
                process.exit()
            }
            if (!visited[neig]){
                stack.push(neig)
                if (graph_now.length > 1){
                    stack.push(-color)
                    need_color_stack.push(-color)
                }
            }
        }

        while (stack.length>0){
            let peak = stack.pop()
            if (peak === -1){
                change_color()
                peak = stack.pop()
            }

            if (!visited[peak] && peak !== -1){
                now = peak
                continue dfs_w
            }
        }
        return
    }
}

for (let i = 1; i<=n; i++){
    if (!visited[i]){
        dfs(i, 1)
    }
    let length_ncs = need_color_stack.length
    for (let i = 0; i < length_ncs; i++){
        let item_ncs = need_color_stack.pop()
        visited[item_ncs] = 2
        if (item_ncs) answer.push(item_ncs)
    }
}

process.stdout.write(answer.reverse().toString().replaceAll(',', ' '))
process.exit()