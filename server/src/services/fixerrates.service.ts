// OpenRatesService for fetching currency data from Open Exchange Rates API
import { config } from '../config';
import axios from 'axios';

export class FixerRatesService {
    /**
     * Fetches available currencies
     * @returns {Promise<any>} List of currencies
     */
    public async getCurrencies(): Promise<any> {
        try {
            const response = await axios.get(`${config.fixerBaseUrl}/symbols?access_key=${config.fixerApiKey}`);

            return response.data?.symbols || {};
        } catch (error) {
            console.error('Error fetching currencies:', error);
            throw new Error('Failed to fetch currencies');
        }
    }

    /**
     * Fetches exchange rates for specific currency
     * @param baseCurrency Base currency to fetch rates for
     * @returns {Promise<any>} Exchange rates data
     */
    public async getExchangeRates(baseCurrency: string): Promise<any> {
        try {
            const response = await axios.get(`${config.fixerBaseUrl}/latest?access_key=${config.fixerRatesApiKey}`);

            return response.data;
        } catch (error) {
            console.error('Error fetching exchange rates:', error);
            throw new Error('Failed to fetch exchange rates');
        }
    }
}