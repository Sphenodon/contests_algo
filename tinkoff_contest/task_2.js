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
    let [n,m,k] = data.map((x)=>parseInt(x))
    let answer = Math.ceil((n*k)/m)

    process.stdout.write(answer.toString())
}