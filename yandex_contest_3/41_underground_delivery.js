/*Для ускорения работы служб доставки под городом Длинноградом был прорыт тоннель, по которому ходит товарный поезд, останавливающийся на промежуточных станциях возле логистических центров. На станциях к концу поезда могут быть присоединены вагоны с определенными товарами, а также от его конца может быть отцеплено некоторое количество вагонов или может быть проведена ревизия, во время которой подсчитывается количество вагонов с определенным товаром.
Обработайте операции в том порядке, в котором они производились, и ответьте на запросы ревизии.

Формат ввода
В первой строке вводится число N (1≤N≤100000) — количество операций, произведенных над поездом.
В каждой из следующих N строк содержится описание операций. Каждая операция может иметь один из трех типов:
add <количество вагонов> <название товара> — добавить в конец поезда <количество вагонов> с грузом <название товара>. Количество вагонов не может превышать 10^9
, название товара — одна строка из строчных латинских символов длиной до 20.
delete <количество вагонов> — отцепить от конца поезда <количество вагонов>. Количество отцепляемых вагонов не превосходит длины поезда.
get <название товара> — определить количество вагонов с товаром <название товара> в поезде. Название товара — одна строка из строчных латинских символов длиной до 20.

Формат вывода
На каждый запрос о количестве вагонов с определенным товаром выведите одно число — количество вагонов с таким товаром. Запросы надо обрабатывать в том порядке, как они поступали.*/
const fs = require('fs');
let arr = fs.readFileSync('input.txt', 'utf8').split(/[\r\n]/gu).filter(Boolean)

let n_comm = parseInt(arr.shift())
let goods = new Map()
let stack = []

for (let raw_command of arr){
    let command_arr = raw_command.split(/ /gu)
    let command = ''
    let n = 0
    let good = ''
    if (command_arr[0] === 'add'){
        command = command_arr[0]
        n = parseInt(command_arr[1])
        good = command_arr[2]
    }
    if (command_arr[0] === 'get'){
        command = command_arr[0]
        good = command_arr[1]
    }
    if (command_arr[0] === 'delete'){
        command = command_arr[0]
        n = parseInt(command_arr[1])
    }

    switch (command) {
        case 'add':
            goods.has(good) ? goods.set(good, goods.get(good) + n) : goods.set(good, n)
            if (stack.length === 0){
                stack.push([good, 0])
            }

            if (stack[stack.length-1][0] === good){
                stack[stack.length-1][1] += n
            }else stack.push([good, n])

            break
        case 'get':
            if (goods.get(good) === undefined){
                process.stdout.write('0' + '\n')
            }else process.stdout.write(goods.get(good).toString() + '\n')
            break
        case 'delete':
            while (n !== 0){
                if (stack.length > 0) {
                    if (stack[stack.length - 1][1] <= n) {
                        n = n - stack[stack.length - 1][1]
                        goods.set(stack[stack.length - 1][0], goods.get(stack[stack.length - 1][0]) - stack[stack.length - 1][1])
                        stack.pop()
                    } else {
                        stack[stack.length - 1][1] -= n
                        goods.set(stack[stack.length - 1][0], goods.get(stack[stack.length - 1][0]) - n)
                        n = 0
                    }
                }
            }
            break
    }
}
