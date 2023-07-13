/*Научитесь пользоваться стандартной структурой данных stack для целых чисел. Напишите программу, содержащую описание стека и моделирующую работу стека, реализовав все указанные здесь методы. Программа считывает последовательность команд и в зависимости от команды выполняет ту или иную операцию. После выполнения каждой команды программа должна вывести одну строчку. Возможные команды для программы:

push n
Добавить в стек число n (значение n задается после команды). Программа должна вывести ok.

pop
Удалить из стека последний элемент. Программа должна вывести его значение.

back
Программа должна вывести значение последнего элемента, не удаляя его из стека.

size
Программа должна вывести количество элементов в стеке.

clear
Программа должна очистить стек и вывести ok.

exit
Программа должна вывести bye и завершить работу.

Перед исполнением операций back и pop программа должна проверять, содержится ли в стеке хотя бы один элемент. Если во входных данных встречается операция back или pop, и при этом стек пуст, то программа должна вместо числового значения вывести строку error.

Формат ввода
Вводятся команды управления стеком, по одной на строке

Формат вывода
Программа должна вывести протокол работы стека, по одному сообщению на строке*/
const fs = require('fs');
let arr = fs.readFileSync('input.txt', 'utf8').split(/[\r\n]/gu).filter(Boolean)

let stack = []
let answer = ''

for (let raw_command of arr){
    // console.log(command)
    let command = raw_command
    let n = 0
    if (raw_command.match(/push/gu)){
        command = raw_command.split(/ /gu)[0]
        n = raw_command.split(/ /gu)[1]
    }
    switch (command) {
        case 'push':
            stack.push(n)
            process.stdout.write('ok' + '\n')
            break
        case 'pop':
            if (stack.length !== 0) {
                process.stdout.write(stack.pop() + '\n')
            }else process.stdout.write('error' + '\n')
            break
        case 'back':
            if (stack.length !== 0) {
                process.stdout.write(stack[stack.length-1] + '\n')
            }else process.stdout.write('error' + '\n')
            break
        case 'size':
            process.stdout.write(stack.length + '\n')
            break
        case 'clear':
            stack = []
            process.stdout.write('ok' + '\n')
            break
        case 'exit':
            process.stdout.write('bye')
            process.exit()
            break
    }
}
