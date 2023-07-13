const fs = require('fs');
let arr = fs.readFileSync('input.txt', 'utf8').split(/[ \r\n]/gu).filter(Boolean)

let t_room = parseInt(arr[0])
let t_cond = parseInt(arr[1])
let command = arr[2]
let t_final = 0

switch (command) {
    case 'freeze':
        t_final = Math.min(t_room, t_cond)
        break
    case 'heat':
        t_final = Math.max(t_room, t_cond)
        break
    case 'auto':
        t_final = t_cond
        break
    case 'fan':
        t_final = t_room
        break
}

process.stdout.write(t_final.toString())
process.exit()