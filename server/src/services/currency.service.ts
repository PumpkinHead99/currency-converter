// CurrencyService class for managing currency-related operations
import { ExchangeRateRepository } from "../database/entities/exchange-rate/exchange-rate.repository";
import { CurrenciesResponse } from "../models/currency.models";

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
}

