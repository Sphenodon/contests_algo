let readline = require('readline');
let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let arr_data = []

rl.on('line', function (data) {
    arr_data.push(data)
});

rl.on('close', () => {
    get_answer(arr_data)
    process.exit()
});

function get_answer(data){
    let n = parseInt(data.shift())
    let s = data.pop()

    let posa = -1
    let posb = -1
    let posc = -1
    let posd = -1
    let answer = -1

    for (let i = 0; i < n; i++) {
        if (s[i] === 'a') posa = i
        if (s[i] === 'b') posb = i
        if (s[i] === 'c') posc = i
        if (s[i] === 'd') posd = i

        let l = Math.min(Math.min(posa, posb), Math.min(posc, posd))
        let len = i - l + 1

        if (l !== -1){
            if (answer === -1 || len < answer){
                answer = len;
            }
        }
    }

    process.stdout.write(answer.toString())
}