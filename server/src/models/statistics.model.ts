import { Statistics } from "../database/entities/statistics/statistics.entity";
import { PagingOptions, PagingResponse } from "./paging.model";

export interface StatisticsFilter {
    baseCurrency?: string;
    targetCurrency?: string;
    paging?: PagingOptions;
}

export interface StatisticsResponse {
    data: Statistics[];
    paging: PagingResponse;
}