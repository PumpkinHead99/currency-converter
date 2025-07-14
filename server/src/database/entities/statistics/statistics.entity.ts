export interface Statistics {
    _id?: string;
    baseCurrency: string;
    targetCurrency: string;
    exchangeRate: number;
    amount: number;
    convertedAmount: number;
    createdAt?: Date;
    deletedAt?: Date | null;
}