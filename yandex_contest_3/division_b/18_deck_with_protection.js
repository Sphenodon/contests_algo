/*Научитесь пользоваться стандартной структурой данных deque для целых чисел.  Напишите программу, содержащую описание дека и моделирующую работу дека, реализовав все указанные здесь методы. Программа считывает последовательность команд и в зависимости от команды выполняет ту или иную операцию. После выполнения каждой команды программа должна вывести одну строчку.

Возможные команды для программы:

push_front n
Добавить (положить) в начало дека новый элемент. Программа должна вывести ok.

push_back n
Добавить (положить) в конец дека новый элемент. Программа должна вывести ok.

pop_front
Извлечь из дека первый элемент. Программа должна вывести его значение.

pop_back
Извлечь из дека последний элемент. Программа должна вывести его значение.

front
Узнать значение первого элемента (не удаляя его). Программа должна вывести его значение.

back
Узнать значение последнего элемента (не удаляя его). Программа должна вывести его значение.

size
Вывести количество элементов в деке.

clear
Очистить дек (удалить из него все элементы) и вывести ok.

exit
Программа должна вывести bye и завершить работу.

Гарантируется, что количество элементов в деке в любой момент не превосходит 100. Перед исполнением операций pop_front, pop_back, front, back программа должна проверять, содержится ли в деке хотя бы один элемент. Если во входных данных встречается операция pop_front, pop_back, front, back, и при этом дек пуст, то программа должна вместо числового значения вывести строку error.

Формат ввода
Вводятся команды управления деком, по одной на строке.

Формат вывода
Требуется вывести протокол работы дека, по одному сообщению на строке*/
const fs = require('fs');
let arr = fs.readFileSync('input.txt', 'utf8').split(/[\r\n]/gu).filter(Boolean)

let deck = []

for (let raw_command of arr){
    // console.log(command)
    let command = raw_command
    let n = 0
    if (raw_command.match(/push/gu)){
        command = raw_command.split(/ /gu)[0]
        n = raw_command.split(/ /gu)[1]
    }
    switch (command) {
        case 'push_front':
            deck.unshift(n)
            process.stdout.write('ok' + '\n')
            break
        case 'push_back':
            deck.push(n)
            process.stdout.write('ok' + '\n')
            break
        case 'pop_front':
            if (deck.length !== 0) {
                process.stdout.write(deck.shift() + '\n')
            }else process.stdout.write('error' + '\n')
            break
        case 'pop_back':
            if (deck.length !== 0) {
                process.stdout.write(deck.pop() + '\n')
            }else process.stdout.write('error' + '\n')
            break
        case 'front':
            if (deck.length !== 0) {
                process.stdout.write(deck[0] + '\n')
            }else process.stdout.write('error' + '\n')
            break
        case 'back':
            if (deck.length !== 0) {
                process.stdout.write(deck[deck.length-1] + '\n')
            }else process.stdout.write('error' + '\n')
            break
        case 'size':
            process.stdout.write(deck.length + '\n')
            break
        case 'clear':
            deck = []
            process.stdout.write('ok' + '\n')
            break
        case 'exit':
            process.stdout.write('bye')
            process.exit()
            break
    }
}