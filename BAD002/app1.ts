import filter from './filter';

function printNumbers() {
    const oddNumbers = filter([1, 2, 3, 4, 5], (num) => num % 2 != 0)
    setTimeout(() => {
        console.log(oddNumbers);
    }, 5000);
}
export default printNumbers;