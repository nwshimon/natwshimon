import Image from 'next/image'
import Link from 'next/link'
import TagBadge from './TagBadge'
import styles from './ProjectCard.module.css'

interface ProjectCardProps {
    href: string
    dateRange: string
    category: string
    imageSrc: string
    imageAlt: string
    title: string
    description: string
    external?: boolean
}

export default function ProjectCard({
    href,
    dateRange,
    category,
    imageSrc,
    imageAlt,
    title,
    description,
    external,
}: ProjectCardProps) {
    return (
        <Link
            href={href}
            className={styles.card}
            {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
            <div className={styles.imageWrap}>
                <Image
                    src={imageSrc}
                    alt={imageAlt}
                    fill
                    sizes="(min-width: 1280px) 360px, (min-width: 768px) 50vw, 100vw"
                    style={{ objectFit: 'cover' }}
                />
            </div>
            <div className={styles.body}>
                <div className={styles.meta}>
                    <span className={styles.date}>{dateRange}</span>
                    <TagBadge label={category} />
                </div>
                <h3 className={styles.title}>{title}</h3>
                <p className={styles.description}>{description}</p>
            </div>
        </Link>
    )
}
