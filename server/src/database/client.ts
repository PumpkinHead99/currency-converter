import { MongoClient, Db } from 'mongodb';
import { config } from '../config';

const client = new MongoClient(config.mongoUri);

let db: Db | null = null;

export const connectToDatabase = async () => {
    if (db) {
        return db;
    }

    try {
        await client.connect();
        db = client.db('currency_converter');

        return db;
    } catch (err) {
        console.error('Failed connecting to Mongo', err);
        throw err;
    }
};

export const getDb = (): Db => {
  if (!db) {
    throw new Error('Database not connected');
  }
  return db;
};
