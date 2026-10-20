import {type SubmitEvent, useState} from "react";
import {useMutation} from "@tanstack/react-query";
import {registerUser} from "../api/auth.ts";
import {getErrorMessage, getFieldErrors} from "../../../lib/errors.ts";
import {useNavigate} from "react-router";
import {toast} from "sonner";
import styles from "../../../styles/Form.module.css";

export default function Register() {
    const [formError, setFormError] = useState<string | null>(null);
    const navigate = useNavigate();
    const registerMutation = useMutation({
        mutationFn: registerUser,
        onSuccess: ({message}) => {
            toast.success(message);
            navigate("/login");
        }
    })

    const fieldErrors = getFieldErrors(registerMutation.error);
    const hasFieldErrors = Object.keys(fieldErrors).length > 0;
    const errorMessage = formError ?? (registerMutation.isError && !hasFieldErrors ? getErrorMessage(registerMutation.error, "Registration failed. Please try again.") : null);

    function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        setFormError(null);
        registerMutation.reset();

        const data = new FormData(e.currentTarget);
        const username = String(data.get("username") ?? "");
        const email = String(data.get("email") ?? "");
        const password = String(data.get("password") ?? "");
        const confirmPassword = String(data.get("confirmPassword") ?? "");

        if (password !== confirmPassword) {
            setFormError("Passwords do not match");
            return;
        }

        registerMutation.mutate({email, password, username});
    }

    return <section className={styles.card}>
        <h1 className={styles.title}>Create an account</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
            {/* Username */}
            <div className={styles.field}>
                <label className={styles.label} htmlFor="username">Username</label>
                {fieldErrors.username && <p className={styles.error} id="username-error">{fieldErrors.username}</p>}
                <input className={styles.input} id="username" type="text" name="username" minLength={3} maxLength={16}
                       required
                       aria-invalid={fieldErrors.username ? true : undefined}
                       aria-describedby={fieldErrors.username ? "username-error" : undefined}/>
            </div>

            {/* Email */}
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
                       maxLength={320}/>
            </div>

            {/* Password */}
            <div className={styles.field}>
                <label className={styles.label} htmlFor="password">Password</label>
                {fieldErrors.password && <p className={styles.error} id="password-error">{fieldErrors.password}</p>}
                <input className={styles.input} id="password" name="password" type="password" required
                       autoComplete="password" minLength={3} maxLength={128}
                       aria-invalid={fieldErrors.password ? true : undefined}
                       aria-describedby={fieldErrors.password ? "password-error" : undefined}/>
            </div>

            {/* Confirm password */}
            <div className={styles.field}>
                <label className={styles.label} htmlFor="confirmPassword">Confirm password</label>
                <input className={styles.input} id="confirmPassword" name="confirmPassword" type="password" required
                       autoComplete="password"
                       minLength={3}
                       maxLength={128}/>
            </div>

            {errorMessage && <p className={styles.alert} role="alert">{errorMessage}</p>}

            <button className={styles.submit} type="submit" disabled={registerMutation.isPending}>
                {registerMutation.isPending ? "Registering..." : "Register"}
            </button>
        </form>
    </section>
}