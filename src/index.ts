// NOTE: This code has not been converted to TypeScript yet
//const arrays = require('./utilities/arrays.js');
import arrays from './utilities/arrays.js';
//const numbers = require('./utilities/numbers.js');
import numbers from './utilities/numbers.js';
//const strings = require('./utilities/strings.js');
import strings from './utilities/strings.js';

const numArr = [3, 4, 5, 6];
const wordArr = ['cat', 'dog', 'rabbit', 'bird'];
const arrSum = arrays.addArr(numArr);
const mixArr = arrays.concatArr(numArr, wordArr);
const myNum = ('15' as unknown)as number % 2;
const five = parseInt('5')
// results of function calls
console.log(arrays.cut3(mixArr));
console.log(numbers.sum(arrSum, myNum));
console.log(strings.capitalize('the quick brown fox'));
console.log(numbers.multiply(five, 8));
console.log(arrays.lgNum(mixArr));
