// export { lib }
// let lib = {
//     someObject: "Hello world!",
//     someFunction: print,
// }



// function print(): string {
//     console.log("Foobar");
//     return "Foobar"
// }


export const lib: {
    someObject: string,
    someFunction: () => string
} = {
    someObject: "Hello world!",
    someFunction: () => {
        return "Foobar"
    }
}

// function abc() {
//     console.log("abc");

// }
// print()