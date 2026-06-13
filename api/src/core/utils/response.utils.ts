import type { Response } from "express";
import type { ResponseData } from "../types/response.types.ts";

const sendResponse = <T>(
    res: Response,
    response: ResponseData<T>
) => {

    const quant =
        response.quant ??
        (
            Array.isArray(response.data)
                ? response.data.length
                : response.data
                    ? 1
                    : 0
        );

    return res
        .status(response.status)
        .json({
            ...response,
            quant
        });
};

export const success = <T>(
    res: Response,
    {
        message = "Operação realizada com sucesso",
        data = null,
        status = 200
    }: {
        message?: string;
        data?: T | null;
        status?: number;
    } = {}
) => {

    return sendResponse(res, {
        success: true,
        status,
        message,
        data
    });
};


export const failed = (
    res: Response,
    {
        message = "Falha na operação",
        error = null,
        status = 400
    }: {
        message?: string;
        error?: unknown;
        status?: number;
    } = {}
) => {

    return sendResponse(res, {
        success: false,
        status,
        message,
        error
    });
};
