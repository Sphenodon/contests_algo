/*Васин жесткий диск состоит из M секторов. Вася последовательно устанавливал на него различные операционные системы следующим методом: он создавал новый раздел диска из последовательных секторов, начиная с сектора номер ai и до сектора bi включительно, и устанавливал на него очередную систему. При этом, если очередной раздел хотя бы по одному сектору пересекается с каким-то ранее созданным разделом, то ранее созданный раздел «затирается», и операционная система, которая на него была установлена, больше не может быть загружена.

Напишите программу, которая по информации о том, какие разделы на диске создавал Вася, определит, сколько в итоге работоспособных операционных систем установлено и работает в настоящий момент на Васином компьютере.

Формат ввода
Сначала вводятся натуральное число M — количество секторов на жестком диске (1 ≤ M ≤ 109) и целое число N — количество разделов, которое последовательно создавал Вася (0 ≤ N ≤ 1000).

Далее идут N пар чисел ai и bi, задающих номера начального и конечного секторов раздела (1 ≤ ai ≤ bi ≤ M).

Формат вывода
Выведите одно число — количество работающих операционных систем на Васином компьютере.*/
const fs = require('fs');
let arr = fs.readFileSync('input.txt', 'utf8').split(/[\r\n]/gu).filter(Boolean)

let sectors = parseInt(arr.shift())
let sections = parseInt(arr.shift())
if (sections === 0) {
    process.stdout.write('0')
    process.exit()
}

let stack = []
stack.push(arr.shift().split(' ').map((x)=> parseInt(x, 10)))
for (let section of arr){
    section = section.split(' ').map((x)=> parseInt(x, 10))
    if (stack[stack.length-1][0] <= section[0] && stack[stack.length-1][1] >= section[1]){
        stack.pop()
        stack.push(section)
        continue
    }
    let stack_buff = []
    while (stack.length > 0 && stack[stack.length-1][1] >= section[0]){
        if (stack[stack.length-1][0] > section[1]){
            stack_buff.push(stack.pop())
            continue
        }
        stack.pop()
    }
    stack.push(section)
    if (stack_buff.length > 0) stack.push(...stack_buff.reverse())
}
process.stdout.write(stack.length.toString())
process.exit()