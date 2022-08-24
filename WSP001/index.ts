// let a = "Jeffrey"

// function getName(param: string): string {
//     return a
// }


// let b = getName('1')
// console.log(b);


function sum(nums: Array<number>): number {  //<--- Type error here if you write nums:Array
    let total = 0;
    for (let num of nums) {
        total += num;
    }
    return total;
}

let result = sum([1, 2, 3])

console.log(result);
