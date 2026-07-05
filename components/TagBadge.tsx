import styles from './TagBadge.module.css'

interface TagBadgeProps {
    label: string | string[]
}

export default function TagBadge({ label }: TagBadgeProps) {
    const labels = Array.isArray(label) ? label : [label]

    return (
        <span className={styles.group}>
            {labels.map((l) => (
                <span key={l} className={styles.badge}>{l}</span>
            ))}
        </span>
    )
}
