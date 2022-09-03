const { mainModule } = require("process");

function myDisplayer(someCallback) {
    console.log("b");
    // console.log(some)
    someCallback()
}
function myDisplayer2() {
    console.log("c");
    // someCallback()
}

function myCalculator(num1, num2, myCallback, someCallback) {
    let sum = num1 + num2;
    myCallback(someCallback);
}

async function test() {
    // setTimeout(() => {
    console.log(2);
    for (let i = 0; i < 10; i++) {
        console.log("b");
    }
    return "string"
    // }, 1000);
}

async function main() {
    console.log(3.1);
    let value = await test();
    console.log(3.2);
    console.log(value);
}

console.log(1);
main();

// myCalculator(5, 5, myDisplayer, myDisplayer2);
// console.log("a");
console.log(4);
for (let i = 0; i < 10; i++) {
    console.log("a");
}
console.log(5);


// myDisplayer(1)