import * as dotenv from 'dotenv'
import * as path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const config = {
    port: process.env.SERVER_PORT || 3800,
    mongoUri: process.env.MONGO_URI || '',
    fixerApiKey: process.env.FIXER_API_KEY || '',
    fixerRatesApiKey: process.env.FIXER_API_KEY || '',
    fixerBaseUrl: 'http://data.fixer.io/api/',
};