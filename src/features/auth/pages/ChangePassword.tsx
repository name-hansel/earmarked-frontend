import {useMutation} from "@tanstack/react-query";
import {changePassword} from "../api/auth.ts";
import {toast} from "sonner";
import {type SubmitEvent, useState} from "react";
import {getErrorMessage, getFieldErrors} from "../../../lib/errors.ts";

export default function ChangePassword() {
    const [formError, setFormError] = useState<string | null>(null);
    const changePasswordMutation = useMutation({
        mutationFn: changePassword,
        onSuccess: ({message}) => toast.success(message)
    });

    function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        setFormError(null);
        changePasswordMutation.reset();
        const form = e.currentTarget;

        const data = new FormData(form);
        const oldPassword = String(data.get("currentPassword") ?? "");
        const newPassword = String(data.get("newPassword") ?? "");
        const confirmPassword = String(data.get("confirmPassword") ?? "");

        if (newPassword !== confirmPassword) {
            setFormError("Passwords do not match");
            return;
        }

        changePasswordMutation.mutate({oldPassword, newPassword}, {onSuccess: () => form.reset()});
    }

    const fieldErrors = getFieldErrors(changePasswordMutation.error);
    const hasFieldErrors = Object.keys(fieldErrors).length > 0;
    const errorMessage =
        formError ??
        (changePasswordMutation.isError && !hasFieldErrors
            ? getErrorMessage(changePasswordMutation.error, "Could not change the password. Please try again.")
            : null);

    return <section>
        <h1>Change password</h1>
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="currentPassword">Current password</label>
                <input
                    id="currentPassword"
                    name="currentPassword"
                    type="password"
                    required
                    autoComplete="current-password"
                />
            </div>
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
            <button type="submit" disabled={changePasswordMutation.isPending}>
                {changePasswordMutation.isPending ? "Saving..." : "Change password"}
            </button>
        </form>
    </section>
}