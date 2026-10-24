import {forgotPassword} from "../api/auth.ts";
import {useMutation} from "@tanstack/react-query";
import {toast} from "sonner";
import {Link, useNavigate} from "react-router";
import {getErrorMessage, getFieldErrors} from "../../../lib/errors.ts";
import {type SubmitEvent} from "react";
import styles from "../../../styles/Form.module.css";
import {useDocumentTitle} from "../../../hooks/useDocumentTitle.ts";

export default function ForgotPassword() {
    useDocumentTitle("Forgot password")

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

    return <section className={styles.card}>
        <h1 className={styles.title}>Forgot password</h1>
        <p className={styles.intro}>Enter your email and we'll send you a link to reset it.</p>
        <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.field}>
                <label className={styles.label} htmlFor="email">Email</label>
                {fieldErrors.email && <p className={styles.error} id="email-error">{fieldErrors.email}</p>}
                <input className={styles.input}
                       id="email"
                       name="email"
                       type="email"
                       required
                       autoComplete="email"
                       aria-invalid={fieldErrors.email ? true : undefined}
                       aria-describedby={fieldErrors.email ? "email-error" : undefined}
                />
            </div>
            {errorMessage && <p className={styles.alert} role="alert">{errorMessage}</p>}
            <button className={styles.submit} type="submit" disabled={forgotPasswordMutation.isPending}>
                {forgotPasswordMutation.isPending ? "Sending..." : "Send reset link"}
            </button>
        </form>
        <Link className={styles.link} to="/login">Back to login</Link>
    </section>
}