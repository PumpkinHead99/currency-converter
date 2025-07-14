// CurrencyService class for managing currency-related operations
import { ExchangeRateRepository } from "../database/entities/exchange-rate/exchange-rate.repository";
import { CurrenciesResponse, CurrencyConversionBody } from "../models/currency.models";

export class CurrencyService {
    private exchangeRateRepository: ExchangeRateRepository;

    constructor(exchangeRateRepository: ExchangeRateRepository) {
        this.exchangeRateRepository = exchangeRateRepository;
    }

    /**
     * Gets available currencies
     * @param baseCurrency Base currency
     * @param targetCurrency Target currency
     * @returns {Promise<number | null>} Exchange rate or null if not found
     */
    public async getCurrencies(): Promise<CurrenciesResponse> {
        try {
            const currencies = await this.exchangeRateRepository.getCurrencies();

            return {
                currencies: currencies || [],
            };
        } catch (error) {
            console.error('Error fetching currencies:', error);
            throw new Error('Failed to fetch currencies');
        }
    }

    /**
     * Converts currency from one to another
     * @param data Currency conversion data
     * @returns {Promise<number | null>} Converted amount
     */
    public async convertCurrency(data: CurrencyConversionBody): Promise<number | null> {
        if (data.amount <= 0) {
            throw new Error('Amount must be greater than zero');
        }

        const rate = await this.exchangeRateRepository.getExchangeRate(data.baseCurrency, data.targetCurrency);

        if (!rate) {
            throw new Error(`Exchange rate not found for ${data.baseCurrency} to ${data.targetCurrency}`);
        }

        const conversion = data.amount * rate;

        // Round to two decimal places
        return Math.round(conversion * 100) / 100;
    }
}

