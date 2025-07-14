import { CurrencyConversionBody } from "../../models/currency.models";

export const CurrencyConversionValidator: Record<keyof CurrencyConversionBody, string> = {
    baseCurrency: 'string',
    targetCurrency: 'string',
    amount: 'number'
};