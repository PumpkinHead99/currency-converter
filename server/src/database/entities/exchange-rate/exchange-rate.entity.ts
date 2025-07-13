export interface ExchangeRate {
    _id: string;
    currency: string;
    name: string;
    rates: Record<string, number>;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}