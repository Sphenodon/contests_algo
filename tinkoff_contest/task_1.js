let readline = require('readline');
let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let arr_data = []

rl.on('line', function (data) {
    arr_data = data.split(' ');
});

rl.on('close', () => {
    get_answer(arr_data)
    process.exit()
});

function get_answer(data){
    let a = parseInt(data[0]);
    let b = parseInt(data[1]);
    let c = parseInt(data[2]);
    let d = parseInt(data[3]);
    let answer = 'NO'
    if (a <= b && b <= c && c <= d){
        answer = 'YES'
    }
    if (a >= b && b >= c && c >= d){
        answer = 'YES'
    }
    process.stdout.write(answer.toString())
}

