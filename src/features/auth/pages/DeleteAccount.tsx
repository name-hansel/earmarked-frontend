import {deleteAccount} from "../api/auth.ts";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {toast} from "sonner";
import {useNavigate} from "react-router";
import {type SubmitEvent} from "react";
import {getErrorMessage} from "../../../lib/errors.ts";
import {currentUserKey} from "../queryKeys.ts";
import styles from "../../../styles/Form.module.css";
import {useDocumentTitle} from "../../../hooks/useDocumentTitle.ts";

export default function DeleteAccount() {
    useDocumentTitle("Delete account")

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

    return <section className={styles.card}>
        <h1 className={styles.title}>Delete account</h1>
        <p className={styles.intro}>
            This permanently deletes your account. Enter your password to confirm.
        </p>
        <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.field}>
                <label className={styles.label} htmlFor="password">Password</label>
                <input className={styles.input}
                       id="password"
                       name="password"
                       type="password"
                       required
                       autoComplete="current-password"
                />
            </div>
            {errorMessage && <p className={styles.alert} role="alert">{errorMessage}</p>}
            <button className={styles.danger} type="submit" disabled={deleteMutation.isPending}>
                {
                    deleteMutation.isPending ? "Deleting account..." : "Delete account"
                }
            </button>
        </form>
    </section>
}