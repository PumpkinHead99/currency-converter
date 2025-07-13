import express from 'express';
import { ExchangeRateRepository } from '../database/entities/exchange-rate/exchange-rate.repository';
import { CurrencyService } from '../services/currency.service';
const router = express.Router();

const exchangeRateRepository = new ExchangeRateRepository();
const currencyService = new CurrencyService(exchangeRateRepository);

router.get('/currencies', async (req, res, next) => {
    try {
        const currencies = await currencyService.getCurrencies();
        res.json(currencies);
    } catch (error) {
        next(error);
    }
});

export default router;