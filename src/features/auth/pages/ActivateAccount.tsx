import {useNavigate, useSearchParams} from "react-router";
import {useEffect, useRef} from "react";
import {activateAccount} from "../api/auth.ts";
import {useMutation} from "@tanstack/react-query";
import {toast} from "sonner";
import {getErrorMessage} from "../../../lib/errors.ts";
import styles from "../../../styles/Form.module.css";

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
        return <section className={styles.card}>
            <p className={styles.alert} role="alert">Invalid activation link</p>
        </section>;
    }

    if (activateAccountMutation.isError) {
        return <section className={styles.card}>
            <p className={styles.alert} role="alert">
                {getErrorMessage(activateAccountMutation.error, "Activation failed. The link may have expired.")}
            </p>
        </section>
    }

    return <section className={styles.card}>
        <p className={styles.status}>Activating account...</p>
    </section>
}