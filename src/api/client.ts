import axios, {isAxiosError} from "axios";
import {queryClient} from "./queryClient.ts";
import {currentUserKey} from "./queryKeys.ts";
import {toast} from "sonner";

declare module "axios" {
    interface AxiosRequestConfig {
        skipAuthRefresh?: boolean;
        _retry?: boolean;
    }
}

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {"Content-Type": "application/json"},
    withCredentials: true
});

let refreshPromise: Promise<void> | null = null;

function handleSessionExpired() {
    const currentUser = queryClient.getQueryData(currentUserKey);
    queryClient.setQueryData(currentUserKey, null);

    if (currentUser) {
        toast.info("Your session has expired. Please log in again.");
    }
}

function refreshSession(): Promise<void> {
    refreshPromise ??= api.post("/auth/refresh", null, {skipAuthRefresh: true}).then(() => undefined).catch((error: unknown) => {
        if (isAxiosError(error) && error.response?.status === 401) {
            handleSessionExpired();
        }
        throw error;
    }).finally(() => {
        refreshPromise = null;
    });

    return refreshPromise;
}

api.interceptors.response.use((response) => response, async (error: unknown) => {
    if (!isAxiosError(error) || error.response?.status !== 401 || !error.config) {
        return Promise.reject(error);
    }

    const original = error.config;
    if (original.skipAuthRefresh || original._retry) {
        return Promise.reject(error);
    }

    original._retry = true;

    try {
        await refreshSession();
    } catch {
        return Promise.reject(error);
    }

    return api(original);
});