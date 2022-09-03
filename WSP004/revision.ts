import { askQuestion, listAllJsRecursive } from './readline'; // from previous exercise
import fs from 'fs';
import os from 'os';
import { resolve } from 'path';

let path = 'C:\\Users\\JeffreyLiu\\Documents\\tecky-exercises\\WEF002'

const readCommand = async () => {
    while (true) { // game-loop, eval-loop
        // Exit by Ctrl+C
        const answer = await askQuestion("Please choose read the report(1) or run the benchmark(2):");
        const option = parseInt(answer, 10);
        console.log(`Option ${answer} chosen.`);
        if (option == 1) {
            await readTheReport();
        } else if (option == 2) {
            await runTheBenchmark();
        } else {
            console.log("Please input 1 or 2 only.");
        }
    }
}

readCommand();

let iterations: number[] = [1, 100, 1000]
let result: Trial[] = []

async function runTheBenchmark() {
    // Detail Here
    for (let iteration of iterations) {
        // let iteration = 1000
        let currentTime = new Date()
        let currentMemory = os.freemem()

        await runMultipleTimes(path, iteration)

        let finalTime = new Date()
        let finalMemory = os.freemem()

        let timeNeeded = finalTime.getTime() - currentTime.getTime();
        let extraMemUsed = currentMemory - finalMemory
        let name = `${iteration} times `
        let resultItem = new ResultItem(currentTime.toISOString(), finalTime.toISOString(), timeNeeded, extraMemUsed, name)
        result.push(resultItem.getData())
    }

    fs.writeFile("result.json", JSON.stringify((result), null, 4),
        {
            encoding: "utf8",
            flag: "w",
        },
        (err) => {
            if (err)
                console.log(err);
            else {
                console.log("\nFile written successfully");
            }
        });
    // console.log(result);
    // console.log(resultItem.getData());


}

async function runMultipleTimes(path: string, iteration: number) {
    let times = 0
    while (times < iteration) {
        listAllJsRecursive(path);
        times++
    }
}

let result1: Trial = {
    startDate: "string",
    endDate: "string",
    timeNeeded: 1,
    extraMemUsed: 2,
    name: "string"
}

type Report = Trial[]

interface Trial {
    //Think of what fields are necessary
    startDate: string;
    endDate: string;
    timeNeeded: number;
    extraMemUsed: number;
    name: string;

}

class ResultItem implements Trial {
    startDate: string;
    endDate: string;
    timeNeeded: number;
    extraMemUsed: number;
    name: string;
    constructor(startDate: string, endDate: string, timeNeeded: number, extraMemUsed: number, name: string) {
        this.startDate = startDate;
        this.endDate = endDate;
        this.timeNeeded = timeNeeded;
        this.extraMemUsed = extraMemUsed;
        this.name = name;
    }

    getData() {
        return {
            startDate: this.startDate,
            endDate: this.endDate,
            timeNeeded: this.timeNeeded,
            extraMemUsed: this.extraMemUsed,
            name: this.name
        }
    }
}

async function readTheReport() {
    // Detail Here
    //Read from JSON file
    let currentData = await fs.promises.readFile("result.json", "utf8")
    // , (err, data) => {
    //     if (err) {
    //         console.error(err);
    //         return;
    //     }
    //     return data
    //     // currentData = data;
    //     // console.log(JSON.parse(data));
    // });
    console.log(JSON.parse(currentData));

}

// runTheBenchmark()