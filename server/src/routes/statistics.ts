import express from 'express';
import { StatisticsRepository } from '../database/entities/statistics/statistics.repository';
import { StatisticsService } from '../services/statistics.service';
const router = express.Router();

const statisticsRepository = new StatisticsRepository();
const statisticsService = new StatisticsService(statisticsRepository);

router.get('/', async (req, res, next) => {
    try {
        const filter = {
            baseCurrency: req.query.baseCurrency as string,
            targetCurrency: req.query.targetCurrency as string,
            paging: {
                page: parseInt(req.query.page as string, 10) || 1,
                take: parseInt(req.query.take as string, 10) || 10,
            },
        }

        const statistics = await statisticsService.get(filter);
        res.json(statistics);
    } catch (error) {
        next(error);
    }
});

export default router;