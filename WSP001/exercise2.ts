function findFactors(num: number): Array<number> {
    let factors: number[] = [];
    for (let factor = 2; factor <= num / 2; factor++) {
        if (num % factor === 0) {
            factors.push(factor);
        }
    }
    return factors;
}

let result2 = [2]

result2 = findFactors(1)


function leapYear(year: number): boolean {
    if (year % 400 === 0) {
        console.log("Leap Year");
        return true;
    } else if (year % 100 === 0) {
        console.log("Not a Leap Year");
        return false;
    } else if (year % 4 === 0) {
        console.log("Leap Year");
        return true;
    } else {
        console.log("Not a Leap Year");
        return false;
    }
}

console.log(leapYear(2000));


function rnaTranscription(dna: Array<string>): string {
    let rna = "";
    for (let nucleotide of dna) {
        switch (nucleotide) {
            case "G":
                rna += "C";
                break;
            case "C":
                rna += "G";
                break;
            case "T":
                rna += "A";
                break;
            case "A":
                rna += "U";
                break;
            default:
                throw new Error(`The nucleotide ${nucleotide} does not exist`)
        }
    }
    return rna;
}

let result3 = rnaTranscription(["G"])

console.log(result3);


function factorial(number: number): number {
    if (number === 0 || number === 1) {
        return 1;
    }

    return factorial(number - 1) * number
}

let result4 = factorial(5)
console.log(result4);


type Teacher = {
    name: string,
    age: number,
    students: Array<Student>
}

type Student = {
    name: string;
    age: number;
    exercises?: Array<scoreItem>
}

type scoreItem = {
    score: number,
    date: Date
}


type People = {
    name: string,
    age: number,
    students: Array<{
        name: string,
        age: number,
        exercises?: Array<{
            score: number,
            date: Date
        }>
    }>
}

// let peter: { [key: string]: string | number | Array<Student> } =
const peter: Teacher =
{
    name: "Peter",
    age: 50,
    students: [
        { name: "Andy", age: 20 },
        { name: "Bob", age: 23 },
        {
            name: "Charlie", age: 25, exercises: [
                { score: 60, date: new Date("2019-01-05") }
            ]
        }
    ]
}

const timeoutHandler: (...args: any[]) => void = () => {
    console.log("Timeout happens!");
}

const timeout = 1000;

// function setTimeout(handler: (...args: any[]) => void, timeout: number): number

setTimeout(timeoutHandler, timeout);


const someValue: number | null = Math.random() > 0.5 ? 12 : null;