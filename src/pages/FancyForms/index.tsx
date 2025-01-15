// Problem 2: Fancy Form
// Task
// Create a currency swap form based on the template provided in the folder.
// A user would use this form to swap assets from one currency to another.
// You may use any third party plugin, library, and/or framework for this problem.
// 1. You may add input validation/error messages to make the form interactive.
// 2. Your submission will be rated on its usage intuitiveness and visual attractiveness.
// 3. Show us your frontend development and design skills, feel free to totally disregard the provided files for this problem.
// 4. You may use this [repo](https://github.com/Switcheo/token-icons/tree/main/tokens) for token images, e.g. [SVG image](https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/SWTH.svg).
// 5. You may use this [URL](https://interview.switcheo.com/prices.json) for token price information and to compute exchange rates (not every token has a price, those that do not can be omitted).

import React, { useEffect, useState } from "react";
import { FancyFormPrices } from "./model.tsx";

function FancyForm() {
    /** current balance */
    const [balance, setBalance] = useState(1000000);
    /** amount to send */
    const [amount, setAmount] = useState("");
    /** amount to receive */
    const [receive, setReceive] = useState("");
    /** error message for amount field */
    const [error, setError] = useState("");
    /** list of currencies */
    const [currencies] = useState([
        ...new Set(FancyFormPrices.map((price) => price.currency)),
    ]);
    /** selected currency */
    const [selectedCurrency, setSelectedCurrency] = useState(currencies[0]);
    // swap amount
    function swapAmount(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (validateForm()) {
            setBalance(balance - getNumber(amount));
            const price = getLatestPrice(selectedCurrency);
            setReceive(
                (getNumber(amount) * price).toLocaleString() + " " + selectedCurrency
            );
        }
    }

    // validate form
    function validateForm() {
        return isValidAmount();
    }

    function getNumber(value: string) {
        return +value.replace(/,/g, "");
    }

    function isValidAmount() {
        const invalid = validateAmount();
        if (invalid) {
            setError(invalid);
            return false;
        } else {
            setError("");
            return true;
        }
    }
    // validate Amount
    function validateAmount() {
        const _amount = getNumber(amount);
        if (!_amount) {
            return "Amount is required";
        }
        if (!/^\d+(\.\d+)?$/.test(_amount.toString())) {
            return "Amount is required and must be a valid number(only accept decimal)";
        }
        if (+_amount > balance) {
            return "Amount must be less than balance";
        }
        return null;
    }

    // get latest price of currency
    function getLatestPrice(currency: string) {
        const price = FancyFormPrices.filter((price) => price.currency === currency)
            .sort((a, b) => getTime(a.date) - getTime(b.date));
        return price[price.length - 1].price;
    }

    // get time of date
    function getTime(date: string) {
        return new Date(date).getTime();
    }

    useEffect(() => {
        isValidAmount();
    }, [amount]);

    // format amount with commas
    function formatAmount(value: string) {
        return value.replace(/[^0-9.]/g, '').replace(/\.(?=.*\.)/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    // get currency icon src
    function getCurrencyIconSrc(currency: string) {
        return `https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${currency}.svg`;
    }

    return (
        <div className="shadow-md flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h1 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Problem 2: Fancy Form</h1>
                <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                    Swap
                </h2>
            </div>
            <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={swapAmount} className="space-y-6">
                    <div className="text-gray-500 text-left">
                        Balance:&nbsp;
                        <strong className="text-2xl text-green-600">
                            {balance.toLocaleString()}
                        </strong>
                    </div>
                    <div>
                        <label
                            htmlFor="send"
                            className="text-left block text-sm/6 font-medium text-gray-900"
                        >
                            Amount to send
                        </label>
                        <div className="mt-2">
                            <input
                                value={amount}
                                onChange={(e) => {
                                    setAmount(
                                        formatAmount(
                                            e.target.value
                                        )
                                    );
                                }}
                                maxLength={16}
                                id="send"
                                name="send"
                                type="send"
                                autoComplete="send"
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                        </div>
                        {error && (
                            <p className="mt-1 text-left text-sm italic text-red-400">
                                {error}
                            </p>
                        )}
                    </div>
                    <div>
                        <label
                            htmlFor="currency"
                            className="text-left block text-sm/6 font-medium text-gray-900"
                        >
                            Currency
                        </label>
                        <div className="flex items-center">
                            <div className="mt-1 grid grid-cols-1">
                                <select
                                    id="currency"
                                    name="currency"
                                    autoComplete="currency-name"
                                    value={selectedCurrency}
                                    onChange={(e) => setSelectedCurrency(e.target.value)}
                                    className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                >
                                    {currencies.map((currency, index) => (
                                        <option key={index} value={currency}>
                                            {currency}
                                        </option>
                                    ))}
                                </select>
                                <svg
                                    className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                                    viewBox="0 0 16 16"
                                    fill="currentColor"
                                    aria-hidden="true"
                                    data-slot="icon"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                            <div>
                                <img
                                    src={getCurrencyIconSrc(selectedCurrency)}
                                    alt="SWTH Icon" className="w-6 h-6 inline-block ml-2"/>
                            </div>
                        </div>
                    </div>
                    <div>
                        <label
                            htmlFor="receive"
                            className="text-left block text-sm/6 font-medium text-gray-900"
                        >
                            Amount to receive
                        </label>
                        <div className="mt-2">
                            <input
                                value={receive}
                                onChange={(e) => setReceive(e.target.value)}
                                id="receive"
                                name="receive"
                                type="receive"
                                disabled={true}
                                required
                                autoComplete="receive"
                                className="block w-full rounded-md bg-amber-100 px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="
                                flex w-full justify-center
                                rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold
                                text-white shadow-sm hover:bg-indigo-500
                                focus-visible:outline focus-visible:outline-2
                                focus-visible:outline-offset-2 focus-visible:outline-indigo-600
                            "
                        >
                            Confirm Swap
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default FancyForm;
