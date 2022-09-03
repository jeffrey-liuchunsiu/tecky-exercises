import readline from 'readline';
// let readline = require('readline');

const ac = new AbortController();
const signal = ac.signal;

let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

rl.question('What is your favorite food? ', { signal }, (answer) => {
    console.log(`Oh, so your favorite food is ${answer}`);
});

signal.addEventListener('abort', () => {
    console.log('The food question timed out');
}, { once: true });

setTimeout(() => {
    ac.abort();
    // rl.question('What is your favorite movie? ', { signal }, (answer) => {
    //     console.log(`Oh, so your favorite movie is ${answer}`);
    // });
}, 2000);