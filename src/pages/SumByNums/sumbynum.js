// Problem 1: Three ways to sum to n
// # Task
// Provide 3 unique implementations of the following function in JavaScript.
//
// **Input**: `n` - any integer
//
// *Assuming this input will always produce a result lesser than `Number.MAX_SAFE_INTEGER`*.
//
// **Output**: `return` - summation to `n`, i.e. `sum_to_n(5) === 1 + 2 + 3 + 4 + 5 === 15`.

// check a number is greater than max safe
// var sum_to_n_a = function(n) {
//     // your code here
// };
// var sum_to_n_b = function(n) {
//     // your code here
// };
// var sum_to_n_c = function(n) {
//     // your code here
// };

// Resolve:
// convert to valid number
function validNumb(n){
    if (!+n) return 0;
    if (n > Number.MAX_SAFE_INTEGER) {
        alert("Number is too big, please enter a number less than 9007199254740991");
        return 0;
    }
    return n;
}

// using iterate
function sumToNA(n) {
    n = validNumb(n);
    let sum = 0;
    for (let index = 0; index <= n; index++) {
        sum += index;
    }
    return sum;

}

// using recursive
function sumToNB(n) {
    n = validNumb(n);
    return sumToNB1(n);
}


function sumToNB1(n) {
    if(!n) return 0;
    const rs = sumToNB1(n-1);
    return rs + n;
}

// using Math
function sumToNC(n) {
    n = validNumb(n);
    return (n * (n + 1)) / 2
}

const n = 6;
const expected = 21
let a = sumToNA(n);
console.log('Using iterate=>', 'Input:',n,' -Expected:',expected,  ' -Output:', a,'-Passed',  a === expected);
a = sumToNB(n);
console.log('Using iterate=>', 'Input:',n,' -Expected:',expected,  ' -Output:', a,'-Passed',  a === expected);
a = sumToNC(n);
console.log('Using iterate=>', 'Input:',n,' -Expected:',expected,  ' -Output:', a,'-Passed',  a === expected);

