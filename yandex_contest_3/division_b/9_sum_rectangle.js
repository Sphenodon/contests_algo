/*Вам необходимо ответить на запросы узнать сумму всех элементов числовой матрицы N×M в прямоугольнике с левым верхним углом (x1, y1) и правым нижним (x2, y2)

Формат ввода
В первой строке находится числа N, M размеры матрицы (1 ≤ N, M ≤ 1000) и K — количество запросов (1 ≤ K ≤ 100000). Каждая из следующих N строк содержит по M чисел`— элементы соответствующей строки матрицы (по модулю не превосходят 1000). Последующие K строк содержат по 4 целых числа, разделенных пробелом x1 y1 x2 y2 — запрос на сумму элементов матрице в прямоугольнике (1 ≤ x1 ≤ x2 ≤ N, 1 ≤ y1 ≤ y2 ≤ M)

Формат вывода
Для каждого запроса на отдельной строке выведите его результат — сумму всех чисел в элементов матрице в прямоугольнике (x1, y1), (x2, y2)*/
const fs = require('fs');
let arr = fs.readFileSync('input.txt', 'utf8').split(/[\r\n]/gu).filter(Boolean)

let n_m_k = arr.shift().split(' ')
let n = parseInt(n_m_k.shift())
let m = parseInt(n_m_k.shift())
let k = parseInt(n_m_k.shift())

let matrix = []
for (let i = 0; i<n; i++){
    let part = arr.shift()
    matrix.push(part.split(' ').map((x)=> parseInt(x, 10)))
}

let pref = [[]]
pref[0][0] = matrix[0][0];

for (let i = 1; i < n; i++) {
    pref.push([pref[i - 1][0] + matrix[i][0]]);
}

for (let i = 1; i < m; i++) {
    pref[0].push(pref[0][i - 1] + matrix[0][i]);
}

for (let i = 1; i < n; i++) {
    for (let j = 1; j < m; j++) {
        pref[i][j] = pref[i - 1][j] + pref[i][j - 1] - pref[i - 1][j - 1] + matrix[i][j];
    }
}

let answer = ''
for (let call of arr){
    call = call.split(' ').map((x)=> parseInt(x, 10))
    let x1 = call[0]-1
    let y1 = call[1]-1
    let x2 = call[2]-1
    let y2 = call[3]-1
    let sum = pref[x2][y2]
        - (x1 ? pref[x1 - 1][y2] : 0)
        - (y1 ? pref[x2][y1 - 1] : 0)
        + (x1 && y1 ? pref[x1 - 1][y1 - 1] : 0);

    answer += sum.toString() + '\n'
}

fs.writeFileSync('output.txt', answer, function(error){
    if(error) throw error;
});