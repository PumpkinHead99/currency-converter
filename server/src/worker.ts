// Worker script to fetch and save exchange rates periodically

import cron from 'node-cron';
import { FixerRatesService } from './services/fixerrates.service';
import { ExchangeRateRepository } from './database/entities/exchange-rate/exchange-rate.repository';
import { connectToDatabase } from './database/client';

const fixerRatesService = new FixerRatesService();
const exchangeRateRepository = new ExchangeRateRepository();

const runJob = async () => {
    const currencies = await fixerRatesService.getCurrencies();

    for (const currency of Object.keys(currencies)) {
        try {
            const ratesResponse = await fixerRatesService.getExchangeRates(currency);
            const rates = ratesResponse.rates;

            await exchangeRateRepository.saveExchangeRate(currency,  currencies[currency], rates);
        } catch (error) {
            console.error(`Failed to fetch or save exchange rates for ${currency}:`, error);
        }
    }
};

connectToDatabase().then(() => {
    runJob();

    cron.schedule('20 0 * * *', runJob);
}).catch(err => {
    console.error('[Worker] Failed to connect to database', err);
});