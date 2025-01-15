
function SumByNums() {
    const code = `
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
    `;
    return (
        <>
            <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Problem 2: Fancy
                Form</h2>
            <pre
                style={{
                    textAlign: "justify",
                    backgroundColor: "#f4f4f4",
                    border: "1px solid #ddd",
                    padding: "10px",
                    overflowX: "auto",
                    whiteSpace: "pre-wrap",
                    fontFamily: "Consolas, Monaco, monospace",
                }}
            >
        {code}
      </pre>
        </>
    );
};

export default SumByNums;
