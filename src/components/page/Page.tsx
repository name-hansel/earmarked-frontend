import type {ReactNode} from "react";
import styles from "./Page.module.css"

export default function Page({children}: { children: ReactNode }) {
    return <section className={styles.page}>{children}</section>
}