import {Link, useNavigate, useSearchParams} from "react-router";
import {useEffect, useRef} from "react";
import {activateAccount} from "../api/auth.ts";
import {useMutation} from "@tanstack/react-query";
import {toast} from "sonner";
import {getErrorMessage} from "../../../lib/errors.ts";
import formStyles from "../../../styles/Form.module.css";
import styles from "./ActivateAccount.module.css";
import {useDocumentTitle} from "../../../hooks/useDocumentTitle.ts";

export default function ActivateAccount() {
    useDocumentTitle("Activating account")

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
        return <section className={styles.panel}>
            <h1 className={styles.errorTitle}>Invalid link</h1>
            <p className={styles.error} role="alert">Invalid activation link</p>
            <Link className={formStyles.link} to="/login">Back to login</Link>
        </section>;
    }

    if (activateAccountMutation.isError) {
        return <section className={styles.panel}>
            <h1 className={styles.errorTitle}>Activation failed</h1>
            <p className={styles.error} role="alert">
                {getErrorMessage(activateAccountMutation.error, "Activation failed. The link may have expired.")}
            </p>
            <Link className={formStyles.link} to="/login">Back to login</Link>
        </section>
    }

    return <section className={styles.panel}>
        <span className={styles.spinner} aria-hidden="true"/>
        <h1 className={styles.title}>Activating your account</h1>
        <p className={styles.text} role="status">This only takes a moment...</p>
    </section>
}