import Link from 'next/link'
import styles from './NotFound.module.css'

export default function NotFound() {
    return (
        <div className={styles.page}>
            <p className={styles.eyebrow}>Nat&rsquo;s Archives &middot; Est. 2005</p>
            <div className={styles.rule} aria-hidden="true" />
            <p className={styles.number} aria-hidden="true">404</p>
            <h1 className={styles.headline}>
                This page seems to have gone missing from the archives.
            </h1>
            <p className={styles.subline}>
                The page you&rsquo;re looking for doesn&rsquo;t exist or may have moved.
                Try heading back to the front page.
            </p>
            <div className={styles.divider} aria-hidden="true" />
            <Link href="/" className={styles.backLink}>
                <span className={styles.arrow} aria-hidden="true">←</span>
                Return to Front Page
            </Link>
        </div>
    )
}
