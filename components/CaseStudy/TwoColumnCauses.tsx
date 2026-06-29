import { renderRichText } from '@/lib/renderRichText'
import styles from './TwoColumnCauses.module.css'

export interface Cause {
    label: string
    statement: string
    body: string
}

interface TwoColumnCausesProps {
    causes: Cause[]
}

export function TwoColumnCauses({ causes }: TwoColumnCausesProps) {
    return (
        <div className={styles.root}>
            {causes.map((cause, i) => (
                <div key={i} className={styles.row}>
                    <p className={styles.label}>{cause.label}</p>
                    <div className={styles.content}>
                        <p className={styles.statement}>{renderRichText(cause.statement)}</p>
                        <p className={styles.body}>{renderRichText(cause.body)}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}
