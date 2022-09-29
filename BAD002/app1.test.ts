import printNumbers from './app1';
import filter from './filter';
jest.mock('./filter');
jest.useFakeTimers();

it('Testing printNumbers', () => {
    console.log = jest.fn();
    printNumbers();
    expect(filter).toBeCalledTimes(1);
    jest.advanceTimersByTime(5000);
    expect(console.log).toBeCalledWith([4, 5, 6]);
});