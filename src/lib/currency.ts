export const CURRENCIES = [
    { value: "USD", label: "USD - US Dollar", symbol: "$", locale: "en-US" },
    { value: "GBP", label: "GBP - British Pound", symbol: "£", locale: "en-GB" },
    { value: "EUR", label: "EUR - Euro", symbol: "€", locale: "de-DE" },
    { value: "JPY", label: "JPY - Japanese Yen", symbol: "¥", locale: "ja-JP" },
    { value: "CAD", label: "CAD - Canadian Dollar", symbol: "C$", locale: "en-CA" },
    { value: "AUD", label: "AUD - Australian Dollar", symbol: "A$", locale: "en-AU" },
] as const;

export type CurrencyCode = typeof CURRENCIES[number]['value'];

export function formatCurrency(amount: number | string, currencyCode: string = "USD") {
    const currency = CURRENCIES.find(c => c.value === currencyCode) || CURRENCIES[0];
    const numAmount = Number(amount);

    return new Intl.NumberFormat(currency.locale, {
        style: "currency",
        currency: currency.value,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(numAmount);
}