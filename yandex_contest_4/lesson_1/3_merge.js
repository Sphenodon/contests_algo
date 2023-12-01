const fs = require('fs');
let arr = fs.readFileSync('input.txt', 'utf8').split(/[\r\n]/gu).filter(Boolean)

const length_arr_1 = parseInt(arr[0])
let arr_1 = []
if (length_arr_1 !== 0) {
    arr_1 = arr[1].split(/[ \r\n]/gu).map(x => parseInt(x, 10))
}
const length_arr_2 = parseInt(arr[2])
let arr_2 = []
if (length_arr_2 !== 0) {
    arr_2 = arr[3].split(/[ \r\n]/gu).map(x => parseInt(x, 10))
}

if (length_arr_1 === 0){
    const length_arr_2 = parseInt(arr[1])
    arr_2 = []
    if (length_arr_2 !== 0) {
        arr_2 = arr[2].split(/[ \r\n]/gu).map(x => parseInt(x, 10))
    }
}

function myMerge(arr, l, m, r){
    let res = arr.slice(l, r + 1)
    let i1 = l
    let i2 = m + 1
    let i = l

    while (i1 <= m && i2 <= r){
        const v1 = res[i1 - l]
        const v2 = res[i2 - l]

        if (v1 < v2){
            arr[i] = v1
            i1++
        } else {
            arr[i] = v2
            i2++
        }
        i++
    }

    while (i1 <= m) {
        arr[i++] = res[i1++ - l]
    }
}

let sorted_arr = arr_1.concat(arr_2)
console.log(sorted_arr)

myMerge(sorted_arr, 0, length_arr_1-1, length_arr_1+length_arr_2-1)

fs.writeFileSync('output.txt', sorted_arr.toString().replaceAll(',', ' '), function(error){
    if(error) throw error;
});