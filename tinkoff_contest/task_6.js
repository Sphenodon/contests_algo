let readline = require('readline');
let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let arr_data = []

rl.on('line', function (data) {
    arr_data.push(data.split(' '))
});

rl.on('close', () => {
    get_answer(arr_data)
    process.exit()
});

let arr_l = []
let arr_r = []

function check(c, n, s){
    let count_r = 0
    let count_l = 0

    for (let i = 0; i < n; i++) {
        if (arr_r[i] >= c) count_r++
        if (arr_l[i] > c) count_l++
    }

    if (count_r < (n+1)/2) return false
    let sum = 0

    for (let i = n-1; i >= (n+1)/2 - 1; i--) {
        if (arr_l[i] <= c){
            sum += (c - arr_l[i])
        }
    }

    return sum <= s
}

function get_answer(data){
    let [n, s] = data.shift().map((x)=>parseInt(x, 10))

    for (let i of data) {
        arr_l.push(parseInt(i[0]))
        arr_r.push(parseInt(i[1]))
    }

    for (let i = 0; i < n; i++) {
        s -= arr_l[i]
    }

    arr_l.sort((a,b) => a-b)
    arr_r.sort((a,b) => a-b)

    let l = arr_l[(n+1)/2 - 1]
    let r = 1e9
    let answer = 0

    while (l <= r){
        let mid = (l+r) >> 1
        if (check(mid, n, s)){
            l = mid + 1
            answer = mid
        }else {
            r = mid - 1
        }
    }

    process.stdout.write(answer.toString())
}