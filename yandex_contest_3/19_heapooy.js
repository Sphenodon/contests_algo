/*В этой задаче вам необходимо самостоятельно (не используя соответствующие классы и функции стандартной библиотеки) организовать структуру данных Heap для хранения целых чисел, над которой определены следующие операции: a) Insert(k) – добавить в Heap число k ; b) Extract достать из Heap наибольшее число (удалив его при этом).

Формат ввода
В первой строке содержится количество команд N (1 ≤ N ≤ 100000), далее следуют N команд, каждая в своей строке. Команда может иметь формат: “0 <число>” или “1”, обозначающий, соответственно, операции Insert(<число>) и Extract. Гарантируется, что при выполнении команды Extract в структуре находится по крайней мере один элемент.

Формат вывода
Для каждой команды извлечения необходимо отдельной строкой вывести число, полученное при выполнении команды Extract.*/
const fs = require('fs');
let arr = fs.readFileSync('input.txt', 'utf8').split(/[\r\n]/gu).filter(Boolean)

let N = arr.shift()
let answer = ''
class MyHeap{
    constructor() {
        this.heap = []
    }

    swap(pos) {
        let heap = this.heap
        while (pos>0 && heap[pos] > heap[(pos-1)/2|0]){
            let buff_heap = heap[pos]
            heap[pos] = heap[(pos-1)/2|0]
            heap[(pos-1)/2|0] = buff_heap
            pos = (pos-1)/2|0
        }
    }

    my_push(n) {
        let heap = this.heap
        heap.push(n)
        let pos = heap.length-1
        this.swap(pos)
    }

    my_pop() {
        let heap = this.heap
        let max = heap[0]
        let i = 0
        while (2*i+2 < heap.length){
            let min = heap[2*i+1] > heap[2*i+2] ? 2*i+1 : 2*i+2
            let heap_buff = heap[i]
            heap[i] = heap[min]
            heap[min] = heap_buff
            i = min
        }

        while (i+1 < heap.length){
            heap[i] = heap[i+1]
            let pos = i
            this.swap(pos)
            i++
        }

        heap.pop()
        return max
    }
}

let my_heap = new MyHeap()

for (let raw_command of arr){
    let command = raw_command
    let n = 0
    if (raw_command.match(/0/gu)){
        command = raw_command.split(/ /gu)[0]
        n = parseInt(raw_command.split(/ /gu)[1])

    }
    switch (command) {
        case '0':
            my_heap.my_push(n)
            break
        case '1':
            answer += my_heap.my_pop().toString() + '\n'
            break
    }
}

process.stdout.write(answer.trim())
process.exit()