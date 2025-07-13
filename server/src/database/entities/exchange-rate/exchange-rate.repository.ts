/**
 * ExchangeRateRepository class for managing exchange rates in the database.
 */
import { getDb } from "../../client";
import { ExchangeRate } from "./exchange-rate.entity";
import { v4 as uuidv4 } from 'uuid';

const COLLECTION_NAME = 'exchange_rates';

export class ExchangeRateRepository {
    /**
     * Gets exchange rate for target and base currency
     * @param baseCurrency Base currency
     * @param targetCurrency Target currency
     * @returns {number | null} Exchange rate
     */
    public async getExchangeRate(baseCurrency: string, targetCurrency: string): Promise<number | null> {
        const db = getDb();
        const collection = await db.collection<ExchangeRate>(COLLECTION_NAME).findOne({ currency: baseCurrency, deletedAt: null });

        return collection ? collection.rates[targetCurrency] : null;
    }

    /**
     * Saves exchange rates for a given base currency
     * @param baseCurrency Base currency
     * @param rates Exchange rates
     * @returns {string} Inserted ID of the exchange rate document
     */
    public async saveExchangeRate(currency: string, currencyName: string, rates?: Record<string, number>): Promise<string> {
        const db = getDb();

        const existingRate = await db.collection<ExchangeRate>(COLLECTION_NAME).findOne({ currency, deletedAt: null });

        if (existingRate) {
            await this.updateExchangeRate(currency, rates || existingRate.rates);
        }

        const rateData: ExchangeRate = {
            _id: uuidv4(),
            currency,
            rates: rates || {},
            name: currencyName,
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null
        }
        
        const rate = await db.collection<ExchangeRate>(COLLECTION_NAME).insertOne(rateData);
        
        return rate.insertedId;
    }

    /**
     * Updates exchange rates
     * @param baseCurrency Base currency
     * @param rates Exchange rates to update
     * @returns {Promise<void>}
     */
    public async updateExchangeRate(baseCurrency: string, rates: Record<string, number>): Promise<void> {
        const db = getDb();

        await db.collection<ExchangeRate>(COLLECTION_NAME).updateOne(
            { currency: baseCurrency, deletedAt: null },
            { $set: { rates, updatedAt: new Date() } }
        );
    }

    /**
     * Deletes exchange rate for a given base currency
     * @param baseCurrency Base currency
     * @returns {Promise<void>}
     */
    public async deleteExchangeRate(baseCurrency: string): Promise<void> {
        const db = getDb();

        await db.collection<ExchangeRate>(COLLECTION_NAME).updateOne(
            { currency: baseCurrency, deletedAt: null },
            { $set: { deletedAt: new Date() } }
        );
    }

    /**
     * Gets all available currencies
     * @returns {Promise<string[]>} List of currencies
     */
    public async getCurrencies(): Promise<string[]> {
        const db = getDb();

        const currencies = await db.collection<ExchangeRate>(COLLECTION_NAME).find({ deletedAt: null }).toArray() || [];

        return currencies.map(rate => rate.currency);
    }
}
