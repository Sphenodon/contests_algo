/*Даны две рациональные дроби: a/b и c/d. Сложите их и результат представьте в виде несократимой дроби m/n.

Формат ввода
Программа получает на вход 4 натуральных числа a, b, c, d, каждое из которых не больше 100.

Формат вывода
Программа должна вывести два натуральных числа m и n такие, что m/n=a/b+c/d и дробь m/n – несократима.
*/
const fs = require('fs');
const input_file = require.resolve('./input.txt')
let arr = fs.readFileSync(input_file, 'utf8').split(/[ \r\n]/gu).filter(Boolean).map((x)=> parseInt(x, 10))

const [x_a, y_a, x_b, y_b] = arr

function arcLength(x1, y1, x2, y2, R){
    // Вычисляем угол между двумя точками в радианах
    let angle_radians = Math.atan2(y1, x1) - Math.atan2(y2, x2)

    // Переводим в градусы
    let angle = Math.abs(angle_radians * 180) / Math.PI

    // Вычисляем длину дуги
    return (2 * Math.PI * R * angle) / 360
}

function findDistance(x_a, y_a, x_b, y_b) {
    const length_a = Math.sqrt(x_a**2 + y_a**2)
    const length_b = Math.sqrt(x_b**2 + y_b**2)

    const arc_length = arcLength(x_a, y_a, x_b, y_b, Math.min(length_a, length_b))
    const diff = Math.abs(length_a - length_b)

    return Math.min(length_a + length_b, arc_length + diff)
}

fs.writeFileSync('output.txt', findDistance(x_a, y_a, x_b, y_b).toString(), function(error){
    if(error) throw error;
});

module.exports = findDistance