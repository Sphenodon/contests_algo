/*Дан неориентированный граф. Требуется определить, есть ли в нем цикл, и, если есть, вывести его.

Формат ввода
В первой строке дано одно число n — количество вершин в графе ( 1 ≤ n ≤ 500 ). Далее в n строках задан сам граф матрицей смежности.

Формат вывода
Если в иcходном графе нет цикла, то выведите «NO». Иначе, в первой строке выведите «YES», во второй строке выведите число k — количество вершин в цикле, а в третьей строке выведите k различных чисел — номера вершин, которые принадлежат циклу в порядке обхода (обход можно начинать с любой вершины цикла). Если циклов несколько, то выведите любой.*/
const fs = require('fs');
let arr = fs.readFileSync('input.txt', 'utf8').split(/[\r\n]/gu).filter(Boolean)

let n_m = arr.shift().split(' ').map((x) => parseInt(x))
let n = n_m[0]
let cohesion = {}

for (let i = 0; i<n; i++){
    let vertices = arr[i].split(' ').map((x) => parseInt(x))
    for (let j = 0; j<n; j++){
        cohesion[i+1] ??= []
        if (vertices[j] === 1) cohesion[i+1].push(j+1)
    }
}
console.log(cohesion)
let visited = {}
let stack = []
let need_color_stack = []
let answer = []

function change_color(start){
    let length_ncs = need_color_stack.length

    if (start){
        let index = need_color_stack.indexOf(start)
        answer = []
        for (let j = index; j < length_ncs; j++){
            if (need_color_stack[j] !== -1) answer.push(need_color_stack[j])
        }
        return
    }

    for (let i = length_ncs - 1; i >= 0; i--){
        if (need_color_stack[i] === -1){
            need_color_stack.pop()
            for (let j = need_color_stack.length - 1; j >= 0; j--){
                if (need_color_stack[j] !== -1) return need_color_stack[j]
            }
        }
        let item_ncs = need_color_stack.pop()
        visited[item_ncs] = 2
        if (item_ncs) answer.push(item_ncs)
    }
}

function dfs(now, color){
    let prev
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
            if (visited[neig] === 1 && prev !== neig){
                change_color(neig)
                process.stdout.write('YES' + '\n' + answer.length.toString() + '\n')
                process.stdout.write(answer.reverse().toString().replaceAll(',', ' '))
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
            prev = now
            let peak = stack.pop()
            if (peak === -1){
                prev = change_color()
                prev = prev === undefined ? now : prev
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
        answer = []
        dfs(i, 1)
    }
    let length_ncs = need_color_stack.length
    for (let i = 0; i < length_ncs; i++){
        let item_ncs = need_color_stack.pop()
        visited[item_ncs] = 2
        if (item_ncs) answer.push(item_ncs)
    }
}

process.stdout.write('NO')
process.exit()