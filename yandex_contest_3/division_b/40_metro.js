/*Метрополитен состоит из нескольких линий метро. Все станции метро в городе пронумерованы натуральными числами от 1 до N. На каждой линии расположено несколько станций. Если одна и та же станция расположена сразу на нескольких линиях, то она является станцией пересадки и на этой станции можно пересесть с любой линии, которая через нее проходит, на любую другую (опять же проходящую через нее).

Напишите программу, которая по данному вам описанию метрополитена определит, с каким минимальным числом пересадок можно добраться со станции A на станцию B. Если данный метрополитен не соединяет все линии в одну систему, то может так получиться, что со станции A на станцию B добраться невозможно, в этом случае ваша программа должна это определить.

Формат ввода
Сначала вводится число N — количество станций метро в городе (2≤N≤100). Далее следует число M — количество линий метро (1≤M≤20). Далее идет описание M линий. Описание каждой линии состоит из числа Pi — количество станций на этой линии (2≤Pi≤50) и Pi чисел, задающих номера станций, через которые проходит линия (ни через какую станцию линия не проходит дважды).

Затем вводятся два различных числа: A — номер начальной станции, и B — номер станции, на которую нам нужно попасть. При этом если через станцию A проходит несколько линий, то мы можем спуститься на любую из них. Так же если через станцию B проходит несколько линий, то нам не важно, по какой линии мы приедем.

Формат вывода
Выведите минимальное количество пересадок, которое нам понадобится. Если добраться со станции A на станцию B невозможно, программа должна вывести одно число –1 (минус один).*/
const fs = require('fs');
let arr = fs.readFileSync('input.txt', 'utf8').split(/[\r\n]/gu).filter(Boolean)

let n_stations = parseInt(arr.shift())
let n_lines = parseInt(arr.shift())
let metro_lines = []
for (let i = 0; i < n_lines; i++) {
    let line = arr.shift().split(' ').map((x) => parseInt(x))
    line.shift()
    let line_set = new Set(line)
    metro_lines.push(line_set)
}
let [start, end] = arr.shift().split(' ').map((x) => parseInt(x))

function findMinTurns(n_lines, metro_lines, start, end){
    let current = new Set()
    for (let i = 0; i<n_lines; i++) {
        if (metro_lines[i].has(start)) {
            metro_lines[i].forEach(function (value) {
                current.add(value)
            })
        }
    }

    if (current.has(end)) {
        return 0
    }

    let step = 1
    while (step < n_lines) {
        let next = new Set(current)
        for (let i = 0; i<n_lines; i++) {
            let candidate = metro_lines[i]
            let intersection = new Set([...current].filter(x => candidate.has(x)));
            if (intersection.size > 0) {
                candidate.forEach(function (value) {
                    next.add(value)
                })
            }
        }
        if (next.has(end)) {
            return step
        }
        current = next
        step++
    }

    return -1
}

process.stdout.write(findMinTurns(n_lines, metro_lines, start, end).toString())
process.exit()