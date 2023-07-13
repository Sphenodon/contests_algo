/*Научитесь пользоваться стандартной структурой данных queue для целых чисел. Напишите программу, содержащую описание очереди и моделирующую работу очереди, реализовав все указанные здесь методы.

Программа считывает последовательность команд и в зависимости от команды выполняет ту или иную операцию. После выполнения каждой команды программа должна вывести одну строчку.

Возможные команды для программы:

push n
Добавить в очередь число n (значение n задается после команды). Программа должна вывести ok.

pop
Удалить из очереди первый элемент. Программа должна вывести его значение.

front
Программа должна вывести значение первого элемента, не удаляя его из очереди.

size
Программа должна вывести количество элементов в очереди.

clear
Программа должна очистить очередь и вывести ok.

exit
Программа должна вывести bye и завершить работу.

Перед исполнением операций front и pop программа должна проверять, содержится ли в очереди хотя бы один элемент. Если во входных данных встречается операция front или pop, и при этом очередь пуста, то программа должна вместо числового значения вывести строку error.

Формат ввода
Вводятся команды управления очередью, по одной на строке

Формат вывода
Требуется вывести протокол работы очереди, по одному сообщению на строке*/
const fs = require('fs');
let arr = fs.readFileSync('input.txt', 'utf8').split(/[\r\n]/gu).filter(Boolean)

let queue = []
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
            queue.push(n)
            process.stdout.write('ok' + '\n')
            break
        case 'pop':
            if (queue.length !== 0) {
                process.stdout.write(queue.shift() + '\n')
            }else process.stdout.write('error' + '\n')
            break
        case 'front':
            if (queue.length !== 0) {
                process.stdout.write(queue[0] + '\n')
            }else process.stdout.write('error' + '\n')
            break
        case 'size':
            process.stdout.write(queue.length + '\n')
            break
        case 'clear':
            queue = []
            process.stdout.write('ok' + '\n')
            break
        case 'exit':
            process.stdout.write('bye')
            process.exit()
            break
    }
}
