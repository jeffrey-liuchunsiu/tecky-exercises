const util = require('util')

function tree(value, left, right) {
    return {
        value,
        left,
        right
    }
}
let result = tree(2,
    tree(7,
        tree(2),
        tree(6,
            tree(5),
            tree(11))),
    tree(5,
        tree(9,
            tree(4)
        ))
)

// console.log(result);

console.log(util.inspect(result, false, null, true /* enable colors */))
// console.log(JSON.stringify(result, null, 4));