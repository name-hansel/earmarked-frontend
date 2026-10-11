import {useMutation, useQueryClient} from "@tanstack/react-query";
import {loginUser, resendActivation} from "../api/auth.ts";
import {useNavigate} from "react-router";
import {type SubmitEvent} from "react";
import {getErrorCode, getErrorMessage} from "../api/errors.ts";
import {currentUserKey} from "../api/queryKeys.ts";
import {toast} from "sonner";

export default function Login() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const loginMutation = useMutation({
        mutationFn: loginUser,
        onSuccess: async () => {
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

    return <section>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
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
            <div>
                <label htmlFor="password">Password</label>
                <input id="password" name="password" type="password" required
                       autoComplete="password" minLength={3} maxLength={128}
                />
            </div>

            {errorMessage && <p role="alert">{errorMessage}</p>}
            {
                isNotActivated && emailToResend && (
                    <button type="button"
                            onClick={() => resendActivationMutation.mutate({email: emailToResend})}
                            disabled={resendActivationMutation.isPending || resendActivationMutation.isSuccess}
                    >
                        {
                            resendActivationMutation.isSuccess ? "Account activation link sent" : resendActivationMutation.isPending ? "Sending..." : "Resend account activation link"
                        }
                    </button>)
            }
            <button type="submit" disabled={loginMutation.isPending}>
                {loginMutation.isPending ? "Logging in..." : "Login"}
            </button>
        </form>
    </section>
}