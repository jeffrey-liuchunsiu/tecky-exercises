import { factorial, fibonacci, NegativeError } from './factorial_fibonacci';

test('check factorial', () => {
    expect(factorial(10)).toBe(3628800);
});

describe('calculating prime', () => {
    test('check fibonacci 10', () => {
        expect(fibonacci(10)).toBe(55);
    })
    test('check fibonacci 9', () => {
        expect(fibonacci(9)).toBe(34);
    })
});

test.only('check factorial negative', () => {
    expect(() => { factorial(-1) }).toThrow(NegativeError);
})

