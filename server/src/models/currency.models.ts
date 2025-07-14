export interface CurrenciesResponse {
    currencies: string[];
}

export interface ConvertCurrencyResponse {
    convertedAmount: number | null;
}

export interface CurrencyConversionBody {
    baseCurrency: string;
    targetCurrency: string;
    amount: number;
}