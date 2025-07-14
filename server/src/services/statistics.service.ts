// Statistics Service handles saving and getting statistics data
import { Statistics } from "../database/entities/statistics/statistics.entity";
import { StatisticsRepository } from "../database/entities/statistics/statistics.repository";
import { StatisticsFilter, StatisticsResponse } from "../models/statistics.model";

export class StatisticsService { 
    private statisticsRepository: StatisticsRepository;

    constructor(statisticsRepository: StatisticsRepository) {
        this.statisticsRepository = statisticsRepository;
    }

    /**
     * Saves statistics
     * @param data Statistics data
     * @returns {Promise<void>}
     */
    async save(data: Statistics): Promise<void> {
        await this.statisticsRepository.saveStatistics(data);
    }

    /**
     * Gets statistics based on filter
     * @param filter Statistics filter
     * @returns {Promise<StatisticsResponse>} Statistics response
     */
    async get(filter: StatisticsFilter): Promise<StatisticsResponse> {
        return await this.statisticsRepository.getStatistics(filter);
    }
}