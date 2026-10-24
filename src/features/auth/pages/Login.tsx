import {hashKey, useMutation, useQueryClient} from "@tanstack/react-query";
import {loginUser, resendActivation} from "../api/auth.ts";
import {Link, useNavigate} from "react-router";
import {type SubmitEvent} from "react";
import {getErrorCode, getErrorMessage} from "../../../lib/errors.ts";
import {currentUserKey} from "../queryKeys.ts";
import {toast} from "sonner";
import styles from "../../../styles/Form.module.css";
import {useDocumentTitle} from "../../../hooks/useDocumentTitle.ts";

export default function Login() {
    useDocumentTitle("Login")

    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const loginMutation = useMutation({
        mutationFn: loginUser,
        onSuccess: async () => {
            queryClient.removeQueries({
                predicate: (query) => query.queryHash !== hashKey(currentUserKey)
            });

            await queryClient.invalidateQueries({queryKey: currentUserKey});
            navigate("/");
        }
    });

    const resendActivationMutation = useMutation({
        mutationFn: resendActivation,
        onSuccess: ({message}) => toast.success(message),
        onError: (error) => {
            toast.error(getErrorMessage(error, "Could not resend the link. Please try again."));
        }
    });

    const isNotActivated = getErrorCode(loginMutation.error) === "UNABLE_TO_LOGIN";
    const emailToResend = loginMutation.variables?.email;
    const errorMessage = loginMutation.isError ? getErrorMessage(loginMutation.error, "Login failed. Please try again.") : null;

    function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        loginMutation.reset();
        resendActivationMutation.reset();

        const data = new FormData(e.currentTarget);
        const email = String(data.get("email") ?? "");
        const password = String(data.get("password") ?? "");

        loginMutation.mutate({email, password});
    }

    return <section className={styles.card}>
        <h1 className={styles.title}>Login</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.field}>
                <label className={styles.label} htmlFor="email">Email</label>
                <input className={styles.input}
                       id="email"
                       name="email"
                       type="email"
                       required
                       autoComplete="email"
                       maxLength={320}/>
            </div>
            <div className={styles.field}>
                <label className={styles.label} htmlFor="password">Password</label>
                <input className={styles.input} id="password" name="password" type="password" required
                       autoComplete="current-password" minLength={3} maxLength={128}
                />
            </div>

            {errorMessage && <p className={styles.alert} role="alert">{errorMessage}</p>}
            {
                isNotActivated && emailToResend && (
                    <button className={styles.secondary} type="button"
                            onClick={() => resendActivationMutation.mutate({email: emailToResend})}
                            disabled={resendActivationMutation.isPending || resendActivationMutation.isSuccess}
                    >
                        {
                            resendActivationMutation.isSuccess ? "Account activation link sent" : resendActivationMutation.isPending ? "Sending..." : "Resend account activation link"
                        }
                    </button>)
            }
            <button className={styles.submit} type="submit" disabled={loginMutation.isPending}>
                {loginMutation.isPending ? "Logging in..." : "Login"}
            </button>
        </form>
        <Link className={styles.link} to="/forgot-password">Forgot your password?</Link>
    </section>
}