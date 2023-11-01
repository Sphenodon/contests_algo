const fs = require('fs');
const input_file = require.resolve('./input.txt')
let arr = fs.readFileSync(input_file, 'utf8')
    .split(/[ \r\n]/gu).filter(Boolean)
    .map(Number)

const n = arr.shift()
const ratings = arr.slice()
function findDissatisfactionLevels(n, ratings){
    // Создание массива префиксных сумм
    let prefixSums = [0];

    // Вычисление префиксных сумм
    for (let i = 1; i <= n; i++) {
        prefixSums[i] = prefixSums[i - 1] + ratings[i - 1];
    }

    // Создание массива уровней недовольства
    let dissatisfactionLevels = [];

    // Вычисление уровней недовольства
    for (let i = 0; i < n; i++) {
        let leftSum = Math.abs(prefixSums[i] - i * ratings[i]);
        let rightSum = prefixSums[n] - prefixSums[i + 1] - (n - i - 1) * ratings[i];
        let dissatisfaction = leftSum + rightSum;
        dissatisfactionLevels.push(dissatisfaction);
    }

    return dissatisfactionLevels.join(' ')
}

fs.writeFileSync('output.txt', findDissatisfactionLevels(n, ratings).toString(), function(error){
    if(error) throw error;
});

module.exports = findDissatisfactionLevels