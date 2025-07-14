import { StatisticsFilter, StatisticsResponse } from "../../../models/statistics.model";
import { getDb } from "../../client";
import { Statistics } from "./statistics.entity";
import { v4 as uuidv4 } from 'uuid';

const COLLECTION_NAME = 'statistics';

export class StatisticsRepository {
    /**
     * Saves statistics for a currency conversion
     * @param baseCurrency Base currency
     * @param targetCurrency Target currency
     * @param exchangeRate Exchange rate used for conversion
     * @param amount Amount in base currency
     * @param convertedAmount Converted amount in target currency
     * @returns {string} Inserted ID of the statistics document
     */
    public async saveStatistics(data: Statistics): Promise<string> {
        const db = getDb();

        const statsData: Statistics = {
            _id: uuidv4(),
            baseCurrency: data.baseCurrency,
            targetCurrency: data.targetCurrency,
            exchangeRate: data.exchangeRate,
            amount: data.amount,
            convertedAmount: data.convertedAmount,
            createdAt: new Date(),
            deletedAt: null
        };

        const stats = await db.collection<Statistics>(COLLECTION_NAME).insertOne(statsData);

        return stats.insertedId;
    }

    /**
     * Gets statistics for a specific conversion
     * @param baseCurrency Base currency
     * @param targetCurrency Target currency
     * @returns {Promise<Statistics | null>} Statistics document or null if not found
     */
    public async getStatistics(filter: StatisticsFilter): Promise<StatisticsResponse> {
        const db = getDb();

        // Build query based on filter
        const query: Partial<Statistics> = {
            ...(filter.baseCurrency && { baseCurrency: filter.baseCurrency }),
            ...(filter.targetCurrency && { targetCurrency: filter.targetCurrency }),
            deletedAt: null
        };

        // Pagination options
        const take = filter.paging?.take || 10;
        const options: any = { limit: take, sort: { createdAt: -1 } };

        if (filter.paging?.page) {
            options.skip = (filter.paging.page - 1) * (take);
        }

        const count = await db.collection<Statistics>(COLLECTION_NAME).countDocuments(query);
        const data = await db.collection<Statistics>(COLLECTION_NAME).find({ ...query }, options).toArray();

        return { data, paging: { total: count, page: filter.paging?.page || 1, take } };
    }

    public async findStatistics(query: Partial<Statistics>): Promise<Statistics[]> {
        const db = getDb();

        return await db.collection<Statistics>(COLLECTION_NAME).find({ ...query, deletedAt: null }).toArray();
    }

    public async softDeleteStatistics(id: string): Promise<void> {
        const db = getDb();

        await db.collection<Statistics>(COLLECTION_NAME).updateOne(
            { _id: id },
            { $set: { deletedAt: new Date() } }
        );
    }
}