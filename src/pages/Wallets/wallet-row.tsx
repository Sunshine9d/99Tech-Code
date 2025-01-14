interface WalletRowProps {
    className: string;
    amount: number;
    usdValue: number;
    formattedAmount: string;
}

export function WalletRow({className, amount, usdValue, formattedAmount}: WalletRowProps) {
    return (
        <li className={className}>
            {amount} - {usdValue} - {formattedAmount}
        </li>
    );
}
