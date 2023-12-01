const fs = require('fs');
let arr = fs.readFileSync('input.txt', 'utf8').split(/[\r\n]/gu).filter(Boolean)

const length_arr = parseInt(arr[0])
let my_arr = []
if (length_arr > 0) {
    my_arr = arr[1].split(/[ \r\n]/gu).map(x => parseInt(x, 10))
}

function myMerge(arr, l, m, r){
    let res = arr.slice(l, r + 1)
    let idx1 = l
    let idx2 = m + 1
    let i = l

    while (idx1 <= m && idx2 <= r){
        const v1 = res[idx1 - l]
        const v2 = res[idx2 - l]

        if (v1 < v2){
            arr[i] = v1
            idx1++
        } else {
            arr[i] = v2
            idx2++
        }
        i++
    }

    while (idx1 <= m) {
        arr[i++] = res[idx1++ - l]
    }
}

function mySort(arr, p, r){
    if (p<r){
        let q = Math.round((p+r-1)/2)
        mySort(arr, p, q)
        mySort(arr, q+1, r)
        myMerge(arr, p, q, r)
    }
}

mySort(my_arr, 0, length_arr-1)

fs.writeFileSync('output.txt', my_arr.toString().replaceAll(',', ' '), function(error){
    if(error) throw error;
});