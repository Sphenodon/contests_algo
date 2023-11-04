/*Отсортируйте данный массив. Используйте пирамидальную сортировку.

Формат ввода
Первая строка входных данных содержит количество элементов в массиве N, N ≤ 105. Далее задаются N целых чисел, не превосходящих по абсолютной величине 109.

Формат вывода
Выведите эти числа в порядке неубывания.*/
const fs = require('fs');
let arr = fs.readFileSync('input.txt', 'utf8').split(/\s/gu).filter(Boolean)
arr = arr.map((x)=> parseInt(x, 10))

let N = arr.shift()
let answer = ''
class MyHeap{
    constructor() {
        this.heap = []
    }

    sort(arr) {
        let n = arr.length;

        // Построение кучи (перегруппируем массив)
        for (let i = n - 1; i >= 0; i--)
        this.heapify(arr, n, i);

        // Один за другим извлекаем элементы из кучи
        for (let i=n-1; i>=0; i--)
        {
            // Перемещаем текущий корень в конец
            let temp = arr[0];
            arr[0] = arr[i];
            arr[i] = temp;

            // Вызываем процедуру heapify на уменьшенной куче
            this.heapify(arr, i, 0);
        }
    }

    heapify(arr, n, i) {
        let largest = i; // Инициализируем наибольший элемент как корень
        let l = 2*i + 1; // левый = 2*i + 1
        let r = 2*i + 2; // правый = 2*i + 2

        // Если левый дочерний элемент больше корня
        if (l < n && arr[l] > arr[largest])
            largest = l;

        // Если правый дочерний элемент больше, чем самый большой элемент на данный момент
        if (r < n && arr[r] > arr[largest])
            largest = r;
        // Если самый большой элемент не корень
        if (largest !== i)
        {
            let swap = arr[i];
            arr[i] = arr[largest];
            arr[largest] = swap;

            // Рекурсивно преобразуем в двоичную кучу затронутое поддерево
            this.heapify(arr, n, largest);
        }
    }
}

let my_heap = new MyHeap()

my_heap.sort(arr)

process.stdout.write(arr.join(' '))
process.exit()
