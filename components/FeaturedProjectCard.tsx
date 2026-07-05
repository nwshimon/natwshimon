import Image from 'next/image'
import Link from 'next/link'
import TagBadge from './TagBadge'
import styles from './FeaturedProjectCard.module.css'

interface FeaturedProjectCardProps {
    href: string
    category: string | string[]
    imageSrc: string
    imageAlt: string
    title: string
    description: string
    ctaLabel?: string
}

export default function FeaturedProjectCard({
    href,
    category,
    imageSrc,
    imageAlt,
    title,
    description,
    ctaLabel = 'Read Case Study',
}: FeaturedProjectCardProps) {
    return (
        <Link href={href} className={styles.card}>
            <div className={styles.imageWrap}>
                <Image
                    src={imageSrc}
                    alt={imageAlt}
                    fill
                    sizes="(min-width: 1280px) 560px, (min-width: 768px) 50vw, 100vw"
                    style={{ objectFit: 'cover', objectPosition: 'left' }}
                />
            </div>
            <div className={styles.body}>
                <TagBadge label={category} />
                <h3 className={styles.title}>{title}</h3>
                <p className={styles.description}>{description}</p>
                <span className={styles.cta}>
                    {ctaLabel} <span aria-hidden="true">→</span>
                </span>
            </div>
        </Link>
    )
}
