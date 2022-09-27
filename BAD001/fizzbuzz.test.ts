import { fizzbuzz } from './fizzbuzz';


describe.only('calculating prime', () => {
    test('check fizzbuzz 15', () => {
        expect(fizzbuzz(15)).toBe("1, 2, Fizz, 4, Buzz, Fizz, 7, 8, Fizz, Buzz, 11, Fizz, 13, 14, Fizz Buzz");
    })

    test('check fizzbuzz 10', () => {
        expect(fizzbuzz(10)).toBe("1, 2, Fizz, 4, Buzz, Fizz, 7, 8, Fizz, Buzz");
    })

});