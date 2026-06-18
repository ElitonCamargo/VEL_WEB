export interface OrderBy {
    column: string;
    direction: "ASC" | "DESC";
}

export interface Pagination {
    limit: number;
    offset: number;
}

export interface Filter {
    column: string;
    operator?: | "=" | ">" | "<" | ">=" | "<=" | "LIKE" | "IN";
    value: unknown;
}