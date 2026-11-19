import type {ComponentType, SVGProps} from "react";
import styles from "./Indicator.module.css"

export default function Indicator({icon: Icon, label}: {
    icon: ComponentType<SVGProps<SVGSVGElement>>,
    label: string,
}) {
    return <span className={styles.indicator} title={label}>
        <Icon className={styles.icon}/>
        <span className={styles.srOnly}>{label}</span>
    </span>
}