export interface ResponseData<T = unknown> {
    success: boolean;
    status: number;
    message: string;
    data?: T | null;
    error?: unknown;
    quant?: number;
    pages?: number;
}