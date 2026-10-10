import {type SubmitEvent, useState} from "react";
import {useMutation} from "@tanstack/react-query";
import {useNavigate} from "react-router";
import {registerUser} from "../api/auth.ts";
import {getErrorMessage, getFieldErrors} from "../api/errors.ts";


export default function Register() {
    const [formError, setFormError] = useState<string | null>(null);
    const navigate = useNavigate();
    const registerMutation = useMutation({
        mutationFn: registerUser,
        onSuccess: () => {
            navigate("/");
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

    return <section>
        <h1>Create an account</h1>
        <form onSubmit={handleSubmit}>
            {/* Username */}
            <div>
                <label htmlFor="username">Username</label>
                {fieldErrors.username && <p id="username-error">{fieldErrors.username}</p>}
                <input id="username" type="text" name="username" minLength={3} maxLength={16} required
                       aria-invalid={fieldErrors.username ? true : undefined}
                       aria-describedby={fieldErrors.username ? "username-error" : undefined}/>
            </div>

            {/* Email */}
            <div>
                <label htmlFor="email">Email</label>
                {fieldErrors.email && <p id="email-error">{fieldErrors.email}</p>}
                <input
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
            <div>
                <label htmlFor="password">Password</label>
                {fieldErrors.password && <p id="password-error">{fieldErrors.password}</p>}
                <input id="password" name="password" type="password" required
                       autoComplete="password" minLength={3} maxLength={128}
                       aria-invalid={fieldErrors.password ? true : undefined}
                       aria-describedby={fieldErrors.password ? "password-error" : undefined}/>
            </div>

            {/* Confirm password */}
            <div>
                <label htmlFor="confirmPassword">Confirm password</label>
                <input id="confirmPassword" name="confirmPassword" type="password" required autoComplete="password"
                       minLength={3}
                       maxLength={128}/>
            </div>

            {errorMessage && <p role="alert">{errorMessage}</p>}

            <button type="submit" disabled={registerMutation.isPending}>
                {registerMutation.isPending ? "Registering..." : "Register"}
            </button>
        </form>
    </section>
}