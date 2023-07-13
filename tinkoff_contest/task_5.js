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
    let arr_change_balance = data.pop().split(' ')
    arr_change_balance = arr_change_balance.map((x)=>parseInt(x, 10))
    arr_change_balance.unshift(0)
    let arr_prefix = [0]
    let history = new Map()
    history.set(0, 0)
    let barrier_i = 0
    let answer = 0

    for (let i = 1; i <= n; i++) {
        arr_prefix[i] = arr_prefix[i-1] + arr_change_balance[i]
    }

    for (let i = 1; i <= n; i++) {
        if (!history.has(arr_prefix[i])){
            history.set(arr_prefix[i], i)
            continue
        }
        let j = history.get(arr_prefix[i]) + 1
        if (j <= barrier_i) continue
        let count_for_left = j - barrier_i
        let count_for_right = n - i + 1
        answer += count_for_left * count_for_right
        barrier_i = j
        history.set(arr_prefix[i], i)
    }

    process.stdout.write(answer.toString())
}