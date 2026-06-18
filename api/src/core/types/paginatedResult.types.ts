export interface PaginatedResult<T> {
    items: T[];
    total: number;
    pages: number;
    page: number;
    limit: number;
}