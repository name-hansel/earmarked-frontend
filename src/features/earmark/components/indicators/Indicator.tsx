import type {ComponentType, ReactNode, SVGProps} from "react";
import styles from "./Indicator.module.css"

export default function Indicator({icon: Icon, label, title = label, showIcon = true, children, hideChildren}: {
    icon: ComponentType<SVGProps<SVGSVGElement>>,
    label: string,
    title?: string,
    showIcon?: boolean,
    children?: ReactNode,
    hideChildren?: boolean
}) {
    
    return <span className={styles.indicator} title={title}>
        {showIcon && <Icon className={styles.icon}/>}
        <span className={showIcon ? styles.srOnly : undefined}>{label}</span>
        {children && <span className={hideChildren ? styles.srOnly : undefined}>{children}</span>}
    </span>;
}