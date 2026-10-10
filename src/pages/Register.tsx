import {type SubmitEvent, useState} from "react";
import {useMutation} from "@tanstack/react-query";
import {useNavigate} from "react-router";
import {registerUser} from "../api/auth.ts";
import {getErrorMessage} from "../api/errors.ts";


export default function Register() {
    const [formError, setFormError] = useState<string | null>(null);
    const navigate = useNavigate();
    const registerMutation = useMutation({
        mutationFn: registerUser,
        onSuccess: () => {
            navigate("/");
        }
    })

    const errorMessage = formError ?? (registerMutation.isError ? getErrorMessage(registerMutation.error, "Registration failed. Please try again.") : null);

    function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        setFormError(null);

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
                <input id="username" type="text" name="username" minLength={3} maxLength={16} required/>
            </div>

            {/* Email */}
            <div>
                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    maxLength={320}/>
            </div>

            {/* Password */}
            <div>
                <label htmlFor="password">Password</label>
                <input id="password" name="password" type="password" required autoComplete="password" minLength={3}
                       maxLength={128}/>
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