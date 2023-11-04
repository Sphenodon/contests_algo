/*В постфиксной записи (или обратной польской записи) операция записывается после двух операндов. Например, сумма двух чисел A и B записывается как A B +. Запись B C + D * обозначает привычное нам (B + C) * D, а запись A B C + D * + означает A + (B + C) * D. Достоинство постфиксной записи в том, что она не требует скобок и дополнительных соглашений о приоритете операторов для своего чтения.
Формат ввода
В единственной строке записано выражение в постфиксной записи, содержащее цифры и операции +, -, *. Цифры и операции разделяются пробелами. В конце строки может быть произвольное количество пробелов.
Формат вывода
Необходимо вывести значение записанного выражения.*/
const fs = require('fs');
let s = fs.readFileSync('input.txt', 'utf8').split(/\s/gu).filter(Boolean)

const operation_arr = ['*','+','-']
let stack = []
let answer = 0

for (let a of s){
    if (operation_arr.includes(a)){
        switch (a) {
            case '+':
                answer = stack.pop() + stack.pop()
                stack.push(answer)
                break
            case '-':
                answer = - stack.pop() + stack.pop()
                stack.push(answer)
                break
            case '*':
                answer = stack.pop() * stack.pop()
                stack.push(answer)
                break
        }
        continue
    }
    stack.push(parseInt(a))
}

fs.writeFileSync('output.txt', answer.toString(), function(error){
    if(error) throw error;
});
