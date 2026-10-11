import {useMutation, useQueryClient} from "@tanstack/react-query";
import {logoutUser} from "../api/auth.ts";
import {currentUserKey} from "./useCurrentUser.ts";
import {useNavigate} from "react-router";
import {isAxiosError} from "axios";
import {toast} from "sonner";
import {getErrorMessage} from "../api/errors.ts";

export function useLogout() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    function clearSession() {
        queryClient.setQueryData(currentUserKey, null);
        navigate("/login");
    }

    return useMutation({
        mutationFn: logoutUser,
        onSuccess: clearSession,
        onError: (error) => {
            if (isAxiosError(error) && error.response?.status === 401) {
                clearSession();
                return;
            }

            toast.error(getErrorMessage(error, "Logout failed. Please try again"));
        }
    });
}