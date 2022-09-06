let test2 = new Promise(function (resolve, reject) {

    resolve(4);

});
// testPromise().then((res) => {
//     console.log(res);
// })
main()
console.log(1);

async function test2Promise() {
    return 2
}
//if need to get sth out of a function, then need to promisify

function testPromise() {
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            resolve(2 + 38);
            // return 2
        }, 2000);

    });

}


async function main() {

    // console.log(test2Promise())
    // console.log(await test2Promise())
    console.log(await testPromise())
    // test2.then((res) => {
    //     console.log(res);
    // })
    let result = await test2
    console.log(result)
    console.log(3);
}