import styles from './PageTitle.module.css'

interface PageTitleProps {
    eyebrow: string
    title: string
    description?: string
}

export default function PageTitle({ eyebrow, title, description }: PageTitleProps) {
    return (
        <div className={styles.wrap}>
            <span className={styles.eyebrow}>{eyebrow}</span>
            <h1 className={styles.title}>{title}</h1>
            {description && <p className={styles.description}>{description}</p>}
        </div>
    )
}
