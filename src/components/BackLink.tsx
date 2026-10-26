import {Link} from "react-router";
import styles from "./BackLink.module.css"

export default function BackLink({backTo}: { backTo: string }) {
    return <Link className={styles.back} to={backTo}><span aria-hidden="true">←</span> Back</Link>;
}