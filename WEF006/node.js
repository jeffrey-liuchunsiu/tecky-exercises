const util = require('util')


function node(value, nodes = []) {
    return {
        value,
        nodes
    }
}

const ten = node(10);
const nine = node(9);
const two = node(2);

const eleven = node(11, [two, nine, ten]);
const eight = node(8, [nine]);
const five = node(5, [eleven]);
const seven = node(7, [eleven, eight]);
const three = node(3, [eight, ten]);

console.log(eleven);
console.log(eight);
console.log(five);
console.log(three);
// console.log(util.inspect(myObject, {showHidden: false, depth: null, colors: true}))

// alternative shortcut
console.log(util.inspect(eleven, false, null, true /* enable colors */))
console.log(util.inspect(eight, false, null, true /* enable colors */))
console.log(util.inspect(five, false, null, true /* enable colors */))
console.log(util.inspect(three, false, null, true /* enable colors */))