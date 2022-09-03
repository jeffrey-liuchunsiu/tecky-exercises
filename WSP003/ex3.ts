import readline from 'readline';

const readLineInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})


readLineInterface.question("What is your name?", (answer: string) => {
    console.log(`Your name is ${answer}`);
    readLineInterface.close();
});
readLineInterface.question("What is your age?", (answer: string) => {
    console.log(`Your age is ${answer}`);
    readLineInterface.close();
});

// let answers: any = {}
// function askQuestion(question: string) {
//     // let answerResult: string | number
//     return new Promise(function (resolve, reject) {
//         readLineInterface.question(question, (answer: string) => {
//             console.log(`Your name is ${answer}`);
//             // readLineInterface.close();

//             resolve(answer)

//         });
//     });
// }


// async function askQuestion(question: string) {
//     let answerResult: string | number
//     // return new Promise(function (resolve, reject) {
//         readLineInterface.question(question, (answer: string) => {
//             console.log(`Your name is ${answer}`);
//             // readLineInterface.close();
//             answerResult = answer

//         });
//     // });
//     return answerResult
// }

// askQuestion("What is your name")
//     .then(async (name) => {
//         answers["name"] = name;
//         let age = await askQuestion("What is your age")
//         return age
//     })
//     .then((age) => {
//         answers["age"] = age;
//         readLineInterface.close();
//         console.log(answers);
//     })

// async function main() {
//     let name = await askQuestion("What is your name")
//     answers['name'] = name;
//     // console.log(name);

//     let age = await askQuestion("What is your age")
//     answers['age'] = age;
//     // console.log(age);

//     readLineInterface.close();
//     console.log(answers);
// }

// main()
