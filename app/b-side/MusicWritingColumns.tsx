import Image from 'next/image'
import type { CSSProperties } from 'react'
import { renderRichText } from '@/lib/renderRichText'
import styles from './MusicWritingColumns.module.css'

export interface ColumnImage {
    src: string
    alt: string
    caption?: string
    href?: string
}

export interface MusicWritingColumn {
    eyebrow: string
    headline: string
    images: (ColumnImage | null)[]
    imageAspectRatio?: string
    caption: string
    captionPosition?: 'top' | 'bottom'
    linkText: string
    linkHref: string
}

export default function MusicWritingColumns({ columns }: { columns: MusicWritingColumn[] }) {
    return (
        <div className={styles.grid}>
            {columns.map((column) => {
                const captionEl = <p className={styles.caption}>{renderRichText(column.caption)}</p>

                return (
                    <div key={column.eyebrow} className={styles.column}>
                        <div className={styles.columnInner}>
                            <span className={styles.eyebrow}>{column.eyebrow}</span>
                            <h3 className={styles.headline}>{renderRichText(column.headline)}</h3>
                            {column.captionPosition === 'top' && captionEl}
                            <div
                                className={styles.imageGrid}
                                style={{ '--img-aspect': column.imageAspectRatio ?? '1 / 1' } as CSSProperties}
                            >
                                {column.images.map((image, i) => {
                                    if (!image) {
                                        return <div key={i} className={styles.imageWrap} />
                                    }

                                    const content = (
                                        <>
                                            <Image src={image.src} alt={image.alt} fill sizes="(min-width: 1024px) 260px, 45vw" style={{ objectFit: 'cover' }} />
                                            {image.caption && (
                                                <span className={styles.imageCaption}>{image.caption}</span>
                                            )}
                                        </>
                                    )

                                    return image.href ? (
                                        <a
                                            key={image.src}
                                            href={image.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={styles.imageWrap}
                                        >
                                            {content}
                                        </a>
                                    ) : (
                                        <div key={image.src} className={styles.imageWrap}>
                                            {content}
                                        </div>
                                    )
                                })}
                            </div>
                            {column.captionPosition !== 'top' && captionEl}
                            <a
                                href={column.linkHref}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.link}
                            >
                                {column.linkText}
                            </a>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
