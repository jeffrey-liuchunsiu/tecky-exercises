const cards = [
    ['Spade', 'A'],
    ['Diamond', 'J'],
    ['Club', '3'],
    ['Heart', '6'],
    ['Spade', 'K'],
    ['Club', '2'],
    ['Heart', 'Q'],
    ['Spade', '6'],
    ['Heart', 'J'],
    ['Spade', '10'],
    ['Club', '4'],
    ['Diamond', 'Q'],
    ['Diamond', '3'],
    ['Heart', '4'],
    ['Club', '7']
];

let sum = []

let resultCards = cards.reduce((acc, item) => {
    //console.log(acc);
    //console.log(item);
    if (item[0] === "Diamond") {

        sum.push(item)
        //console.log(sum);
        return sum

    } else {
        //console.log(acc);
        return sum
    }
}, [])

console.log(resultCards);