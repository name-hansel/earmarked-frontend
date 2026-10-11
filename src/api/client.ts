import axios, {isAxiosError} from "axios";

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

function refreshSession(): Promise<void> {
    refreshPromise ??= api.post("auth/refresh", null, {skipAuthRefresh: true}).then(() => undefined).finally(() => {
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