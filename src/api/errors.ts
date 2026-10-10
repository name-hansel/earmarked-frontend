import {isAxiosError} from "axios";

const GENERIC_ERROR = "Something went wrong. Please try again.";
const NETWORK_ERROR = "Cannot reach the server. Check your connection and try again.";

export type ApiErrorBody = {
    code?: string;
    message?: string;
    fieldErrors?: Record<string, string>;
};

export function getErrorMessage(error: unknown, fallback: string = GENERIC_ERROR): string {
    if (isAxiosError<ApiErrorBody>(error)) {
        if (!error.response) {
            return NETWORK_ERROR;
        }

        return error.response?.data?.message ?? fallback;
    }

    return GENERIC_ERROR;
}

export function getFieldErrors(error: unknown): Record<string, string> {
    if (isAxiosError<ApiErrorBody>(error)) {
        return error.response?.data?.fieldErrors ?? {};
    }
    return {};
}