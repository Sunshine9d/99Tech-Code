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
    return [1000, 2000, 3000];
}

function useWalletBalances() {
    const data: WalletBalance[] = [
        {currency: '0', amount: -20, blockchain: 'Ethereum', id: 1},
        {currency: '0', amount: -10, blockchain: 'Osmosis', id: 2},
        {currency: '1', amount: 10, blockchain: 'Ethereum', id: 3},
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

        }).sort((lhs: WalletBalance, rhs: WalletBalance) =>
            compareFn(getPriority(lhs.blockchain), getPriority(rhs.blockchain)));
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
    function compareFn(a: number, b: number) {
        return a - b;
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
        const usdValue = (prices[+balance.currency] || 0) * (balance.amount || 0);
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
        <div {...rest}>
            {rows}
        </div>
    )
}
export default WalletPage;
