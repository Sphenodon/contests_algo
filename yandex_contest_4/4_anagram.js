const fs = require('fs');
const input_file = require.resolve('./input.txt')
let arr = fs.readFileSync(input_file, 'utf8')
    .split(/[ \r\n]/gu).filter(Boolean)

const [s1, s2] = arr

function isThisAnAnagram(s1, s2){
    const list_for_s1 = s1.split('').sort()
    const list_for_s2 = s2.split('').sort()

    return list_for_s1.toString() === list_for_s2.toString() ? 'YES' : 'NO'
}

fs.writeFileSync('output.txt', isThisAnAnagram(s1, s2).toString(), function(error){
    if(error) throw error;
});

module.exports = isThisAnAnagram