import {type SubmitEvent, useState} from "react";

export default function Register() {
    const [error, setError] = useState<string | null>(null);

    function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        setError(null);

        const data = new FormData(e.currentTarget);
        // const username = String(data.get("username") ?? "");
        // const email = String(data.get("email") ?? "");
        const password = String(data.get("password") ?? "");
        const confirmPassword = String(data.get("confirmPassword") ?? "");

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        console.log(data);
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

            {error && <p role="alert">{error}</p>}
            <button type="submit">Register</button>
        </form>
    </section>
}