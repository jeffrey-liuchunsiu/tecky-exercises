
// import { variable } from './second.js'

let { variable } = require('./second.js')
let readline = require('readline');
let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})


console.log(variable);

