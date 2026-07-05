'use client'

import { useState } from 'react'
import Image from 'next/image'
import { renderRichText } from '@/lib/renderRichText'
import styles from './AccordionColumns.module.css'

export interface AccordionColumnImage {
    src: string
    alt: string
    caption?: string
}

export interface AccordionColumnData {
    eyebrow?: string
    title: string
    content: string
    bullets?: string[]
    images: AccordionColumnImage[]
}

interface AccordionColumnsProps {
    columns: AccordionColumnData[]
    onImageClick: (src: string, alt: string) => void
}

function AccordionColumn({ column, onImageClick }: { column: AccordionColumnData; onImageClick: (src: string, alt: string) => void }) {
    const [open, setOpen] = useState(false)

    return (
        <div
            className={`${styles.column} ${open ? styles.open : ''}`}
            role="button"
            tabIndex={0}
            onClick={() => setOpen(o => !o)}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    setOpen(o => !o)
                }
            }}
            aria-expanded={open}
        >
            <div className={styles.trigger}>
                <span className={styles.titleGroup}>
                    {column.eyebrow && <span className={styles.eyebrow}>{column.eyebrow}</span>}
                    <span className={styles.title}>{column.title}</span>
                </span>
                <span className={styles.chevron} aria-hidden="true" />
            </div>

            <div className={styles.panel}>
                <div className={styles.panelInner}>
                    <div className={styles.expanded}>
                        <p className={styles.prose}>{renderRichText(column.content)}</p>

                        <div className={styles.images}>
                            {column.images.map((image, idx) => (
                                <figure key={idx} className={styles.figure}>
                                    <button
                                        type="button"
                                        className={styles.imageBtn}
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            onImageClick(image.src, image.alt)
                                        }}
                                        aria-label="Open image fullscreen"
                                    >
                                        <Image
                                            src={image.src}
                                            alt={image.alt}
                                            width={800}
                                            height={600}
                                            style={{ width: '100%', height: 'auto', display: 'block' }}
                                        />
                                    </button>
                                    {image.caption && <figcaption className={styles.caption}>{image.caption}</figcaption>}
                                </figure>
                            ))}
                        </div>

                        {column.bullets && column.bullets.length > 0 && (
                            <ul className={styles.bullets}>
                                {column.bullets.map((bullet, idx) => (
                                    <li key={idx} className={styles.bulletItem}>
                                        {renderRichText(bullet)}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export function AccordionColumns({ columns, onImageClick }: AccordionColumnsProps) {
    return (
        <div className={styles.row}>
            {columns.map((column, idx) => (
                <AccordionColumn key={idx} column={column} onImageClick={onImageClick} />
            ))}
        </div>
    )
}
