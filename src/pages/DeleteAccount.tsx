import {deleteAccount} from "../api/auth.ts";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {toast} from "sonner";
import {useNavigate} from "react-router";
import {type SubmitEvent} from "react";
import {getErrorMessage} from "../api/errors.ts";
import {currentUserKey} from "../api/queryKeys.ts";

export default function DeleteAccount() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const deleteMutation = useMutation({
        mutationFn: deleteAccount,
        onSuccess: () => {
            toast.success('Account deleted successfully.');
            navigate("/", {replace: true});
            queryClient.setQueryData(currentUserKey, null);
        }
    });

    function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        deleteMutation.reset();

        const data = new FormData(e.currentTarget);
        const password = String(data.get("password") ?? "");

        deleteMutation.mutate({password});
    }

    const errorMessage = deleteMutation.isError ? getErrorMessage(deleteMutation.error, "Could not delete account. Please try again.") : null;

    return <section>
        <h1>Delete account</h1>
        <p>
            This permanently deletes your account. Enter your password to confirm.
        </p>
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    autoComplete="current-password"
                />
            </div>
            {errorMessage && <p role="alert">{errorMessage}</p>}
            <button type="submit" disabled={deleteMutation.isPending}>
                {
                    deleteMutation.isPending ? "Deleting account..." : "Delete account"
                }
            </button>
        </form>
    </section>
}