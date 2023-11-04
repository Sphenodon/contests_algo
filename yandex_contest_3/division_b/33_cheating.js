/*Во время контрольной работы профессор Флойд заметил, что некоторые студенты обмениваются записками. Сначала он хотел поставить им всем двойки, но в тот день профессор был добрым, а потому решил разделить студентов на две группы: списывающих и дающих списывать, и поставить двойки только первым.

У профессора записаны все пары студентов, обменявшихся записками. Требуется определить, сможет ли он разделить студентов на две группы так, чтобы любой обмен записками осуществлялся от студента одной группы студенту другой группы.

Формат ввода
В первой строке находятся два числа N и M — количество студентов и количество пар студентов, обменивающихся записками (1 ≤ N ≤ 10^2, 0 ≤ M ≤ N(N−1)/2).

Далее в M строках расположены описания пар студентов: два числа, соответствующие номерам студентов, обменивающихся записками (нумерация студентов идёт с 1). Каждая пара студентов перечислена не более одного раза.

Формат вывода
Необходимо вывести ответ на задачу профессора Флойда. Если возможно разделить студентов на две группы - выведите YES; иначе выведите NO.*/
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
    cohesion[vertices[1]] ??= []
    cohesion[vertices[1]].push(vertices[0])
}

let visited = {}
let stack = []
function dfs(now, color){
    dfs_w: while (true){
        visited[now] = color
        let graph_now

        if (cohesion[now] === undefined) {
            return
        } else {
            graph_now = cohesion[now]
        }

        for (let neig of graph_now) {
            if (visited[now] === visited[neig]){
                process.stdout.write('NO')
                process.exit()
            }
            if (!visited[neig]){
                stack.push(neig)
                stack.push(-color)
            }
        }

        while (stack.length>0){
            let peak = stack.pop()
            if (peak === -1 || peak === -2){
                color = -peak
                peak = stack.pop()
            }

            if (!visited[peak]){
                color = 3 - color
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
}

process.stdout.write('YES')
process.exit()
