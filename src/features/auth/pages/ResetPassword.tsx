import {useMutation} from "@tanstack/react-query";
import {resetPassword} from "../api/auth.ts";
import {toast} from "sonner";
import {Link, useNavigate, useSearchParams} from "react-router";
import {getErrorMessage, getFieldErrors} from "../../../lib/errors.ts";
import {type SubmitEvent, useState} from "react";

export default function ResetPassword() {
    const navigate = useNavigate();
    const [formError, setFormError] = useState<string | null>(null);
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");

    const resetPasswordMutation = useMutation({
        mutationFn: resetPassword,
        onSuccess: ({message}) => {
            toast.success(message);
            navigate("/login");
        }
    })

    const fieldErrors = getFieldErrors(resetPasswordMutation.error);
    const hasFieldErrors = Object.keys(fieldErrors).length > 0;
    const serverError = resetPasswordMutation.isError && !hasFieldErrors;
    const errorMessage =
        formError ??
        (serverError
            ? getErrorMessage(resetPasswordMutation.error, "Could not reset the password. Please try again.")
            : null);

    function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!token) return;
        setFormError(null);
        resetPasswordMutation.reset();

        const data = new FormData(e.currentTarget);
        const newPassword = String(data.get("newPassword") ?? "");
        const confirmPassword = String(data.get("confirmPassword") ?? "");

        if (newPassword !== confirmPassword) {
            setFormError("Passwords do not match");
            return;
        }

        resetPasswordMutation.mutate({token, newPassword});
    }

    if (!token) {
        return (
            <section>
                <p role="alert">This password reset link is invalid.</p>
                <Link to="/forgot-password">Request a new link</Link>
            </section>
        );
    }

    return <section>
        <h1>Reset password</h1>
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="newPassword">New password</label>
                <input
                    id="newPassword"
                    name="newPassword"
                    type="password"
                    required
                    minLength={8}
                    maxLength={128}
                    autoComplete="new-password"
                    aria-invalid={fieldErrors.newPassword ? true : undefined}
                    aria-describedby={fieldErrors.newPassword ? "newPassword-error" : undefined}
                />
                {fieldErrors.newPassword && <p id="newPassword-error">{fieldErrors.newPassword}</p>}
            </div>
            <div>
                <label htmlFor="confirmPassword">Confirm new password</label>
                <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    minLength={8}
                    maxLength={128}
                    autoComplete="new-password"
                />
            </div>
            {errorMessage && <p role="alert">{errorMessage}</p>}
            {serverError && <Link to="/forgot-password">Request a new link</Link>}

            <button type="submit" disabled={resetPasswordMutation.isPending}>
                {resetPasswordMutation.isPending ? "Resetting..." : "Reset password"}
            </button>
        </form>
    </section>
}