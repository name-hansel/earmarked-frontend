import {forgotPassword} from "../api/auth.ts";
import {useMutation} from "@tanstack/react-query";
import {toast} from "sonner";
import {Link, useNavigate} from "react-router";
import {getErrorMessage, getFieldErrors} from "../api/errors.ts";
import {type SubmitEvent} from "react";

export default function ForgotPassword() {
    const navigate = useNavigate();
    const forgotPasswordMutation = useMutation({
        mutationFn: forgotPassword,
        onSuccess: ({message}) => {
            toast.success(message);
            navigate("/login");
        }
    });

    function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        forgotPasswordMutation.reset();

        const data = new FormData(e.currentTarget);
        const email = String(data.get("email") ?? "");

        forgotPasswordMutation.mutate({email});
    }

    const fieldErrors = getFieldErrors(forgotPasswordMutation.error);
    const hasFieldErrors = Object.keys(fieldErrors).length > 0;
    const errorMessage =
        forgotPasswordMutation.isError && !hasFieldErrors
            ? getErrorMessage(forgotPasswordMutation.error, "Could not send the password reset link. Please try again.")
            : null;

    return <section>
        <h1>Forgot password</h1>
        <p>Enter your email and we'll send you a link to reset it.</p>
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    aria-invalid={fieldErrors.email ? true : undefined}
                    aria-describedby={fieldErrors.email ? "email-error" : undefined}
                />
                {fieldErrors.email && <p id="email-error">{fieldErrors.email}</p>}
            </div>
            {errorMessage && <p role="alert">{errorMessage}</p>}
            <button type="submit" disabled={forgotPasswordMutation.isPending}>
                {forgotPasswordMutation.isPending ? "Sending..." : "Send reset link"}
            </button>
        </form>
        <p>
            <Link to="/login">Back to login</Link>
        </p>
    </section>
}