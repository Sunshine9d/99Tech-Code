// Problem 3: Messy React
// # Task
//
// List out the computational inefficiencies and anti-patterns found in the code block below.
//
// 1. This code block uses
//     a. ReactJS with TypeScript.
//     b. Functional components.
//     c. React Hooks
// 2. You should also provide a refactored version of the code, but more points are awarded to accurately stating the
// issues and explaining correctly how to improve them.


import {WalletRow} from "./wallet-row.tsx";
import React, {useMemo} from "react";
// missing blockchain
interface WalletBalance {
    currency: string;
    amount: number;
    blockchain: string;
    id: number;
}

// add id to FormattedWalletBalance
interface FormattedWalletBalance {
    currency: string;
    amount: number;
    formatted: string;
    id: number;
}

// improve: add interface
interface  BoxProps {
    className?: string;
    style?: React.CSSProperties;
}

// missing BoxProps
interface Props extends BoxProps {
    children?: {
        classes: {
            row: string;
        };
    }
}

function usePrices() {
    return [
        {currency:"BLUR",date:"2023-08-29T07:10:40.000Z",price:0.20811525423728813},
        {currency:"bNEO",date:"2023-08-29T07:10:50.000Z",price:7.1282679},
        {currency:"BUSD",date:"2023-08-29T07:10:40.000Z",price:0.999183113},
        {currency:"BUSD",date:"2023-08-29T07:10:40.000Z",price:0.9998782611186441},
        {currency:"USD",date:"2023-08-29T07:10:30.000Z",price:1},
        {currency:"ETH",date:"2023-08-29T07:10:52.000Z",price:1645.9337373737374},
        {currency:"GMX",date:"2023-08-29T07:10:40.000Z",price:36.345114372881355},
        {currency:"STEVMOS",date:"2023-08-29T07:10:40.000Z",price:0.07276706779661017},
        {currency:"LUNA",date:"2023-08-29T07:10:40.000Z",price:0.40955638983050846},
        {currency:"RATOM",date:"2023-08-29T07:10:40.000Z",price:10.250918915254237},
        {currency:"STRD",date:"2023-08-29T07:10:40.000Z",price:0.7386553389830508},
        {currency:"EVMOS",date:"2023-08-29T07:10:40.000Z",price:0.06246181355932203},
        {currency:"IBCX",date:"2023-08-29T07:10:40.000Z",price:41.26811355932203},
        {currency:"IRIS",date:"2023-08-29T07:10:40.000Z",price:0.0177095593220339},
        {currency:"ampLUNA",date:"2023-08-29T07:10:40.000Z",price:0.49548589830508477},
        {currency:"KUJI",date:"2023-08-29T07:10:45.000Z",price:0.675},
        {currency:"STOSMO",date:"2023-08-29T07:10:45.000Z",price:0.431318},
        {currency:"USDC",date:"2023-08-29T07:10:40.000Z",price:0.989832},
        {currency:"axlUSDC",date:"2023-08-29T07:10:40.000Z",price:0.989832},
        {currency:"ATOM",date:"2023-08-29T07:10:50.000Z",price:7.186657333333334},
        {currency:"STATOM",date:"2023-08-29T07:10:45.000Z",price:8.512162050847458},
        {currency:"OSMO",date:"2023-08-29T07:10:50.000Z",price:0.3772974333333333},
        {currency:"rSWTH",date:"2023-08-29T07:10:40.000Z",price:0.00408771},
        {currency:"STLUNA",date:"2023-08-29T07:10:40.000Z",price:0.44232210169491526},
        {currency:"LSI",date:"2023-08-29T07:10:50.000Z",price:67.69661525423729},
        {currency:"OKB",date:"2023-08-29T07:10:40.000Z",price:42.97562059322034},
        {currency:"OKT",date:"2023-08-29T07:10:40.000Z",price:13.561577966101694},
        {currency:"SWTH",date:"2023-08-29T07:10:45.000Z",price:0.004039850455012084},
        {currency:"USC",date:"2023-08-29T07:10:40.000Z",price:0.994},
        {currency:"USDC",date:"2023-08-29T07:10:30.000Z",price:1},
        {currency:"USDC",date:"2023-08-29T07:10:30.000Z",price:1},
        {currency:"USDC",date:"2023-08-29T07:10:40.000Z",price:0.9998782611186441},
        {currency:"WBTC",date:"2023-08-29T07:10:52.000Z",price:26002.82202020202},
        {currency:"wstETH",date:"2023-08-29T07:10:40.000Z",price:1872.2579742372882},
        {currency:"YieldUSD",date:"2023-08-29T07:10:40.000Z",price:1.0290847966101695},
        {currency:"ZIL",date:"2023-08-29T07:10:50.000Z",price:0.01651813559322034}];
}

function useWalletBalances() {
    const data: WalletBalance[] = [
        {currency: 'BUSD', amount: -20, blockchain: 'Neo', id: 1},
        {currency: 'USC', amount: -10, blockchain: 'Osmosis', id: 2},
        {currency: 'USC', amount: 10, blockchain: 'Ethereum', id: 3},
        {currency: 'USC', amount: -5, blockchain: 'Ethereum', id: 4},
        {currency: 'WBTC', amount: 20, blockchain: 'Zilliqa', id: 5},
        {currency: 'WBTC', amount: 6, blockchain: 'Zilliqa', id: 6},
        {currency: 'WBTC', amount: -100, blockchain: 'Zilliqa', id: 7},
    ];
    return data;
}

// add WalletBlockchain object
const  WalletBlockchain: {[k: string]: number} = {
    Osmosis: 100,
    Ethereum: 50,
    Arbitrum: 30,
    Zilliqa: 20,
    Neo: 20,
}
const WalletPage: React.FC<Props> = (props: Props) => {
    // unused children property from props
    const { ...rest } = props;
    // const { children, ...rest } = props;
    const classes = rest?.children?.classes ?? {
        row: 'xxx'
    };
    const balances = useWalletBalances();
    const prices = usePrices();
    // fix type of blockchain any to string
    // const getPriority = (blockchain: any): number => {
    // const getPriority = (blockchain: string): number => {
    //     switch (blockchain) {
    //         case 'Osmosis':
    //             return 100
    //         case 'Ethereum':
    //             return 50
    //         case 'Arbitrum':
    //             return 30
    //         case 'Zilliqa':
    //             return 20
    //         case 'Neo':
    //             return 20
    //         default:
    //             return -99
    //     }
    // }

    // can use object WalletBlockchain instead of switch case
    // using index signature instead of switch case can improve readability and performance
    const getPriority = (blockchain: string): number => {
        return WalletBlockchain[blockchain] || -99;
    }

    const sortedBalances = useMemo(() => {
        return balances.filter((balance: WalletBalance) => {
            // add blockchain to interface
            const balancePriority = getPriority(balance.blockchain);
            // lhsPriority is not defined in the function
            // use balancePriority instead
            // if (lhsPriority > -99) {
            // if (balancePriority > -99) {
            //     if (balance.amount <= 0) {
            //         return true;
            //     }
            // }
            // flat condition
            if (balancePriority === -99) return false;
            return balance.amount <= 0;

        }).sort(compareFn);
        // }).sort((lhs: WalletBalance, rhs: WalletBalance) => {
        //     const leftPriority = getPriority(lhs.blockchain);
        //     const rightPriority = getPriority(rhs.blockchain);
        //     if (leftPriority > rightPriority) {
        //         return -1;
        //     } else if (rightPriority > leftPriority) {
        //         return 1;
        //     }
        //     // a must be equal to b
        //     return 0;
        // });

    }, [balances, prices]);

    // add new function compareFn
    function compareFn(lhs: WalletBalance, rhs: WalletBalance) {
        return getPriority(lhs.blockchain) - getPriority(rhs.blockchain);
    }
    // format array as FormattedWalletBalance
    const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
        return {
            ...balance,
            formatted: balance.amount.toFixed()
        } as FormattedWalletBalance; // add formatted property
    })
    // miss using formattedBalances instead of sortedBalances variable
    // redundant format =>  balance: FormattedWalletBalance
    // remove index parameter from map function
    // const rows = sortedBalances.map((balance: FormattedWalletBalance, index: number) => {
    const rows = formattedBalances.map((balance) => {
        // convert balance.currency to number
        // check undefined value
        // convert to object for improve performance
        const _price: {[k: string]: { price: number }} = prices.reduce((a, v) => ({ ...a, [v.currency]: v}), {})
        const usdValue = (_price[balance.currency]?.price || 0) * (balance.amount || 0);
        return (
                <WalletRow
                    // missing classes.row
                    // add manually key property or inherent from parent
                    className={classes?.row}
                    // Special Props Warning
                    // key={index}
                    key={balance.id}
                    // convert to id to avoid conflict with key
                    amount={balance.amount}
                    usdValue={usdValue}
                    formattedAmount={balance.formatted}
                />
        )
    })
    return (
        <>
            <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                Problem 3: Messy React
            </h2>
            <ul {...rest}>
                {rows}
            </ul>
        </>
)
}
export default WalletPage;
