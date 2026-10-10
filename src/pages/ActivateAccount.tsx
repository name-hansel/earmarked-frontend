import {useNavigate, useSearchParams} from "react-router";
import {useEffect, useRef} from "react";
import {activateAccount} from "../api/auth.ts";
import {useMutation} from "@tanstack/react-query";
import {toast} from "sonner";
import {getErrorMessage} from "../api/errors.ts";

export default function ActivateAccount() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const hasStarted = useRef(false);

    const activateAccountMutation = useMutation({
        mutationFn: activateAccount,
        onSuccess: () => {
            toast.success("Account activated successfully.");
            navigate("/login");
        }
    });

    useEffect(() => {
        if (!token || hasStarted.current) return;
        hasStarted.current = true;
        activateAccountMutation.mutate({token});
    }, [token, activateAccountMutation]);

    if (!token) {
        return <p role="alert">Invalid activation link</p>;
    }

    if (activateAccountMutation.isError) {
        return <section>
            <p role="alert">
                {getErrorMessage(activateAccountMutation.error, "Activation failed. The link may have expired.")}
            </p>
        </section>
    }

    return <p>Activating account...</p>
}