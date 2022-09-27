// export {}

export function fizzbuzz(number) {
    let count = 1
    let resultArray: any[] = []
    while (count <= number) {
        if (count % 3 == 0 && count % 5 == 0) {
            resultArray.push("Fizz Buzz")
            count++;
        } else if (count % 3 == 0) {
            resultArray.push("Fizz")
            count++;
        } else if (count % 5 == 0) {
            resultArray.push("Buzz")
            count++;
        } else {
            resultArray.push(count)
            count++;
        }
    }
    return resultArray.join(", ")
}