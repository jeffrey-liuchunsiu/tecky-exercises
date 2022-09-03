let readline = require('readline');
// import abortcon

const ac = new AbortController();
const signal = ac.signal;

let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

rl.question('What is your favorite food? ', { signal }, (answer) => {
    console.log(`Oh, so your favorite food is ${answer}`);
    ac.abort();
});

signal.addEventListener('abort', () => {
    console.log('The food question timed out');
    rl.question('What is your favorite movie? ', { signal }, (answer) => {
        console.log(`Oh, so your favorite movie is ${answer}`);
    });

}, { once: true });

setTimeout(() => {
    // rl.close();
}, 2000);