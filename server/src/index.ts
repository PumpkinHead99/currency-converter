import express from 'express'
import { MongoClient } from 'mongodb'
import cors from 'cors';
import conversionRoutes from './routes/currency';
import statisticsRoutes from './routes/statistics';
import { config } from './config';
import { connectToDatabase } from './database/client';

// Application setup
const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/currency', conversionRoutes);
app.use('/api/statistics', statisticsRoutes);

// Connect to DB and start the server
connectToDatabase().then(() => {
    app.listen(config.port, () => {
        console.log(`Server is running at http://localhost:${config.port}`);
    });
}).catch((err) => {
    console.error('Failed to connect to database', err);
    process.exit(1);
});