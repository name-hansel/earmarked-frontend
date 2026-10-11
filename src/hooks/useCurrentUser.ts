import {useQuery} from "@tanstack/react-query";
import {fetchCurrentUser} from "../api/auth.ts";
import {isAxiosError} from "axios";

export const currentUserKey = ["currentUser"] as const;

export function useCurrentUser() {
    return useQuery({
        queryKey: currentUserKey,
        queryFn: async () => {
            try {
                return await fetchCurrentUser();
            } catch (error) {
                if (isAxiosError(error) && error.response?.status === 401) return null;
                throw error;
            }
        },
        staleTime: 5 * 60 * 1000,
        retry: 1
    });
}