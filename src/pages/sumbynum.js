
// check a number is greater than max safe
// convert to valid number
function validNumb(n){
    if (!+n) return 0;
    if (n > Number.MAX_SAFE_INTEGER) return  Number.MAX_SAFE_INTEGER;
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
    if(!n) return 0;
    const rs = sumToNB(n-1);
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
console.log('Using iterate=>', 'input:',n,' -expected:',expected,  ' -output:', a,'-passed',  a === expected);
a = sumToNB(n);
console.log('Using iterate=>', 'input:',n,' -expected:',expected,  ' -output:', a,'-passed',  a === expected);
a = sumToNC(n);
console.log('Using iterate=>', 'input:',n,' -expected:',expected,  ' -output:', a,'-passed',  a === expected);

