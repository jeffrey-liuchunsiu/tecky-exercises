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

//Question 1
let spadeItems = cards.filter(item => {
    if (item[0] === "Spade") {
        return true
    }
})
// console.log(spadeItems.length)

//Question2
function compareCard(cardA, cardB) {
    const ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
    const suits = ["Diamond", "Club", "Heart", "Spade"];
    const [suitA, rankA] = cardA;
    const [suitB, rankB] = cardB;
    const ranksDiff = ranks.indexOf(rankA) - ranks.indexOf(rankB);
    if (ranksDiff !== 0) {
        return ranksDiff;
    } else {
        return suits.indexOf(suitA) - suits.indexOf(suitB);
    }
}

let greaterItems = cards.filter(item => {
    let result = compareCard(item, ["Club", "3"])
    if (result >= 0) {
        return true
    }
})
// console.log(greaterItems);

//Questions 3
let sumArray = []
let resultCards = cards.reduce((acc, item) => {
    // console.log(acc);
    // console.log(item);
    const ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
    if (item[0] === "Diamond" || item[0] === "Heart") {
        let ranksDiff = ranks.indexOf(item[1]) - ranks.indexOf("J");
        //console.log(ranksDiff);
        if (ranksDiff >= 0) {
            return sumArray.push(item)

        } else {
            return sumArray
        }
    } else {
        //console.log(acc);
        return sumArray
    }
}, [])
console.log(resultCards);

//Questions 4
const cards4 = [
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
let resultCards4 = cards4.map(item => {
    //return item.splice(0, 0, "Diamond")
    if (item[0] === "Club") {
        //console.log(item);
        itemToProcess = item
        itemToProcess.splice(0, 1, "Diamond")
        return itemToProcess
    } else {
        return item
    }
})
//console.log(resultCards4);


//Question 5
const cards5 = [
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
let resultCards5 = cards5.map(item => {
    //return item.splice(0, 0, "Diamond")
    if (item[1] === "A") {
        //console.log(item);
        itemToProcess = item
        itemToProcess.splice(1, 1, "2")
        return itemToProcess
    } else {
        return item
    }
})
//console.log(resultCards5);