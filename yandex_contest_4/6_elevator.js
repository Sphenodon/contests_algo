const fs = require('fs');
const input_file = require.resolve('./input.txt')
let arr = fs.readFileSync(input_file, 'utf8')
    .split(/[ \r\n]/gu).filter(Boolean)
    .map(Number)

const people_capacity = arr.shift()
const floors = arr.shift()
const employees_on_floor = arr.slice()

function findTransportationTime(k, a){
    let total_time = BigInt(0);
    let people_remainder = BigInt(0);
    let up_floor = BigInt(0);

    for (let i = a.length - 1; i >= 0; i--) {
        let floor = BigInt(i + 1);

        if (people_remainder === BigInt(0)) {
            up_floor = floor;
        }

        people_remainder += BigInt(a[i]);

        if (people_remainder >= BigInt(k)) {
            total_time += up_floor * BigInt(2);
            people_remainder -= BigInt(k);
            up_floor = floor;
        }

        if (people_remainder >= BigInt(k)) {
            let trips = people_remainder / BigInt(k);
            total_time += floor * BigInt(2) * trips;
            people_remainder %= BigInt(k);
        }
    }

    if (people_remainder !== BigInt(0)) {
        total_time += up_floor * BigInt(2);
    }

    return parseInt(total_time.toString())
}

fs.writeFileSync('output.txt', findTransportationTime(people_capacity, employees_on_floor).toString(), function(error){
    if(error) throw error;
});

module.exports = findTransportationTime