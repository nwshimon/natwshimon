import Image from 'next/image'
import Link from 'next/link'
import styles from './PagePreviewCard.module.css'

interface PagePreviewCardProps {
    href: string
    label: string
    headline: string
    teaser: string
    imageSrc: string
    animationDelay?: string
}

export default function PagePreviewCard({
    href,
    label,
    headline,
    teaser,
    imageSrc,
    animationDelay,
}: PagePreviewCardProps) {
    return (
        <Link
            href={href}
            className={styles.card}
            style={animationDelay ? { animationDelay } : undefined}
        >
            <div className={styles.imageWrap}>
                <Image src={imageSrc} alt="" fill style={{ objectFit: 'cover' }} />
            </div>
            <div className={styles.body}>
                <span className={styles.label}>{label}</span>
                <h3 className={styles.headline}>{headline}</h3>
                <p className={styles.teaser}>{teaser}</p>
            </div>
        </Link>
    )
}
