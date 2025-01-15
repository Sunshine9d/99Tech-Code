interface WalletRowProps {
    className: string;
    amount: number;
    usdValue: number;
    formattedAmount: string;
}

export function WalletRow({
  className,
  amount,
  usdValue,
  formattedAmount,
}: WalletRowProps) {
    return (
        <>
            <li className={"flex justify-flex-start gap-6 py-5" + className}>
                <div className="w-52 text-left">
                    <p className="text-sm/6 font-semibold text-gray-900">
                        Amount: {amount}
                    </p>
                </div>
                <div className="w-52 text-left">
                    <p className="text-sm/6 text-gray-900">
                        Formatted Amount: {formattedAmount}
                    </p>
                </div>
                <div className="w-80 text-right">
                    <p className="text-sm/6 text-gray-900">
                        USD Value: {usdValue}
                    </p>
                </div>
            </li>
        </>
    );
}
