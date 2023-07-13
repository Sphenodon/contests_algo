/*Диего увлекается коллекционированием наклеек. На каждой из них написано число, и каждый коллекционер мечтает собрать наклейки со всеми встречающимися числами.

Диего собрал N наклеек, некоторые из которых, возможно, совпадают. Как-то раз к нему пришли K коллекционеров. i-й из них собрал все наклейки с номерами не меньшими, чем pi. Напишите программу, которая поможет каждому из коллекционеров определить, сколько недостающих ему наклеек есть у Диего. Разумеется, гостей Диего не интересуют повторные экземпляры наклеек.

Формат ввода
В первой строке содержится единственное число N (0 ≤ N ≤ 100 000) — количество наклеек у Диего.

В следующей строке содержатся N целых неотрицательных чисел (не обязательно различных) — номера наклеек Диего. Все номера наклеек не превосходят 109.

В следующей строке содержится число K (0 ≤ K ≤ 100 000) — количество коллекционеров, пришедших к Диего. В следующей строке содержатся K целых чисел pi (0 ≤ pi ≤ 109), где pi — наименьший номер наклейки, не интересующий i-го коллекционера.

Формат вывода
Для каждого коллекционера в отдельной строке выведите количество различных чисел на наклейках, которые есть у Диего, но нет у этого коллекционера.*/

const fs = require('fs');
let time = performance.now()
let arr = fs.readFileSync('input.txt', 'utf8').split(/[\r\n]/gu).filter(Boolean)

let count_card_diego = arr.shift()
let cards_diego = arr.shift().split(' ').map((x)=> parseInt(x, 10))
let count_collectors = arr.shift()
let cards_collectors = arr.shift().split(' ').map((x)=> parseInt(x, 10))
let answer = ''

let kit_cards_diego = new Map()

for (let card of cards_diego){
    kit_cards_diego.set(card, 0)
}

let sorted_kit_card_diego = Array.from(kit_cards_diego.keys()).sort(function(a, b) {return a - b;})
function find_need_cards(card, n){
    if (n<4){
        n = 0
        for (let i = 0; i<sorted_kit_card_diego.length;i++){
            if (sorted_kit_card_diego[i] < card) n++
        }
        return n
    }

    n = n/2|0
    let prev_n = 0
    while (n!==0 && n!==sorted_kit_card_diego.length-1){
        if (sorted_kit_card_diego[n] > card){
            n = prev_n === 0 ? n/2|0 : n - prev_n + prev_n/2|0
            prev_n = prev_n/2|0
            continue
        }
        if (sorted_kit_card_diego[n] >= card) {
            return n
        }
        if (sorted_kit_card_diego[n+1] >= card) return n+1

        if (sorted_kit_card_diego[n] < card) {
            prev_n = prev_n === 0 ? n : prev_n
            n += (1 + prev_n)/2|0
            prev_n = prev_n/2|0
        }
    }

    if (n===0 && sorted_kit_card_diego[n] < card) return n + 1
    if (sorted_kit_card_diego[n] < card) return n+1
    return n
}

for(let cards_collector of cards_collectors){
    let need_cards = 0
    need_cards = find_need_cards(cards_collector, sorted_kit_card_diego.length)
    answer += need_cards + '\n'
}

fs.writeFileSync('output.txt', answer, function(error){
    if(error) throw error;
});

time = performance.now() - time
console.log(time)