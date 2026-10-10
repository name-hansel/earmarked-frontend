import {isAxiosError} from "axios";

const GENERIC_ERROR = "Something went wrong. Please try again.";

type ApiErrorBody = {
    message?: string;
};

// TODO: Handle as per ApiError from backend

export function getErrorMessage(error: unknown, fallback: string = GENERIC_ERROR): string {
    if (isAxiosError<ApiErrorBody>(error)) {
        if (!error.response) {
            return "Cannot reach the server. Check your connection and try again.";
        }

        return error.response?.data?.message ?? fallback;
    }

    return GENERIC_ERROR;
}