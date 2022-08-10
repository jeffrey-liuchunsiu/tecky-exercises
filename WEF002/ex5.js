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

let cards1 = JSON.parse(JSON.stringify(cards))
let sumArray = []
let resultCards1 = cards1.reduce((acc, item) => {
    const ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
    if (item[0] === "Diamond" || item[0] === "Heart") {
        let ranksDiff = ranks.indexOf(item[1]) - ranks.indexOf("J");

        if (ranksDiff >= 0) {
            return sumArray.push(item)

        } else {
            return sumArray
        }
    } else {
        return sumArray
    }
}, [])
console.log(resultCards1);


//let sumArray = []
let cards2 = JSON.parse(JSON.stringify(cards))
let resultCards2 = cards.reduce((acc, item) => {
    const ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
    if (item[0] === "Diamond" || item[0] === "Heart") {
        let ranksDiff = ranks.indexOf(item[1]) - ranks.indexOf("J");

        if (ranksDiff >= 0) {
            acc.push(item)
            return acc

        } else {
            return acc
        }
    } else {
        return acc
    }
}, [])
console.log(resultCards2);