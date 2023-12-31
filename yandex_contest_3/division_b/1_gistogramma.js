/*Вовочка ломает систему безопасности Пентагона. Для этого ему понадобилось узнать, какие символы в секретных зашифрованных посланиях употребляются чаще других. Для удобства изучения Вовочка хочет получить графическое представление встречаемости символов. Поэтому он хочет построить гистограмму количества символов в сообщении. Гистограмма — это график, в котором каждому символу, встречающемуся в сообщении хотя бы один раз, соответствует столбик, высота которого пропорциональна количеству этих символов в сообщении.

Формат ввода
Входной файл содержит зашифрованный текст сообщения. Он содержит строчные и прописные латинские буквы, цифры, знаки препинания («.», «!», «?», «:», «-», «,», «;», «(», «)»), пробелы и переводы строк. Размер входного файла не превышает 10000 байт. Текст содержит хотя бы один непробельный символ. Все строки входного файла не длиннее 200 символов.Для каждого символа c кроме пробелов и переводов строк выведите столбик из символов «#», количество которых должно быть равно количеству символов c в данном тексте. Под каждым столбиком напишите символ, соответствующий ему. Отформатируйте гистограмму так, чтобы нижние концы столбиков были на одной строке, первая строка и первый столбец были непустыми. Не отделяйте столбики друг от друга. Отсортируйте столбики в порядке увеличения кодов символов.

Формат вывода
Для каждого символа c кроме пробелов и переводов строк выведите столбик из символов «#», количество которых должно быть равно количеству символов c в данном тексте. Под каждым столбиком напишите символ, соответствующий ему. Отформатируйте гистограмму так, чтобы нижние концы столбиков были на одной строке, первая строка и первый столбец были непустыми. Не отделяйте столбики друг от друга. Отсортируйте столбики в порядке увеличения кодов символов.*/

const fs = require('fs');
let s = fs.readFileSync('input.txt', 'utf8').toString().replaceAll(/\s/gu, '')
s = Array.from(s).sort()

let char_count = new Map()

for (let i of s){
    if (char_count.has(i)){
        char_count.set(i, char_count.get(i) + 1)
        continue
    }
    char_count.set(i, 1)
}

let max_in_dict = [...char_count.entries()].reduce((accumulator, element) => {
    return element[1] > accumulator[1] ? element : accumulator;
})[0]
let answer = ''

for(let i of char_count){
    answer += i[0]
}

while (char_count.get(max_in_dict) !== 0){
    answer += '\n'
    for (let [key, value] of char_count){
        if (value > 0){
            answer += '#'
            char_count.set(key, value - 1)
        } else answer += ' '
    }
}

answer = answer.split("\n").reverse().join("\n")

fs.writeFileSync('output.txt', answer, function(error){
    if(error) throw error;
});