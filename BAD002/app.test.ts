import { log } from 'console';
import printNumbers from './app';
import filter from './filter';

// Mock the filter module
jest.mock('./filter');

it('Testing printNumbers', () => {
    console.log(jest.mock);

    // Since we are using typescript, tell compiler filter is a Mock.
    // Mock return value to be [1,3,5]
    (filter as jest.Mock).mockReturnValue([1, 3, 5]);
    // filter.mockReturnValue([1, 3, 5]);
    // Also need to mock console.log
    console.log = jest.fn();
    // IMPORTANT!! printNumbers is the testing function , it is never mock!!
    printNumbers();
    // Verification
    expect(filter).toBeCalledTimes(1);
    expect(console.log).toBeCalledWith([1, 3, 5]);
});