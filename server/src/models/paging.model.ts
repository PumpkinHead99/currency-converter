export interface PagingOptions {
    page?: number;
    take?: number;
}

export interface PagingResponse<> {
    total: number;
    page: number;
    take: number;
}