import express from 'express';
import { ExchangeRateRepository } from '../database/entities/exchange-rate/exchange-rate.repository';
import { CurrencyService } from '../services/currency.service';
import { BodyMiddleware } from '../utils/body-middleware';
import { CurrencyConversionValidator } from '../utils/validators/currency.validator';
const router = express.Router();

const exchangeRateRepository = new ExchangeRateRepository();
const currencyService = new CurrencyService(exchangeRateRepository);

router.get('/', async (req, res, next) => {
    try {
        const currencies = await currencyService.getCurrencies();
        res.json(currencies);
    } catch (error) {
        next(error);
    }
});

router.post('/convert', BodyMiddleware(CurrencyConversionValidator), async (req, res, next) => {
    try {
        const convertedAmount = await currencyService.convertCurrency(req.body);

        res.json({ result: convertedAmount });
    } catch (error) {
        next(error);
    }
});

export default router;