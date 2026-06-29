'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import type { ContentBlock, SideItem } from '@/lib/caseStudies'
import { renderRichText } from '@/lib/renderRichText'
import { TwoColumnCauses } from './TwoColumnCauses'
import styles from './ProseBody.module.css'

interface ProseBodyProps {
    blocks: ContentBlock[]
    className?: string
}

export function ProseBody({ blocks, className }: ProseBodyProps) {
    const [lightboxSrc, setLightboxSrc] = useState<string | null>(null)
    const [lightboxAlt, setLightboxAlt] = useState('')

    const closeLightbox = useCallback(() => setLightboxSrc(null), [])

    useEffect(() => {
        if (!lightboxSrc) return
        function onKey(e: KeyboardEvent) {
            if (e.key === 'Escape') closeLightbox()
        }
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [lightboxSrc, closeLightbox])

    function openLightbox(src: string, alt: string) {
        setLightboxSrc(src)
        setLightboxAlt(alt)
    }

    function renderSideItem(item: SideItem, idx: number) {
        if (item.type === 'callout') {
            return (
                <blockquote key={idx} className={styles.callout}>
                    {renderRichText(item.content)}
                </blockquote>
            )
        }
        return (
            <figure key={idx} className={styles.inlineFigure}>
                <button
                    className={styles.imageBtn}
                    onClick={() => openLightbox(item.src, item.alt)}
                    aria-label="Open image fullscreen"
                >
                    <Image
                        src={item.src}
                        alt={item.alt}
                        width={800}
                        height={600}
                        style={{ width: '100%', height: 'auto', display: 'block' }}
                    />
                </button>
                {item.caption && (
                    <figcaption className={styles.caption}>{item.caption}</figcaption>
                )}
            </figure>
        )
    }

    return (
        <>
            <div className={`${styles.body} ${className ?? ''}`}>
                {blocks.map((block, i) => {
                    if (block.type === 'section') {
                        return (
                            <h2 key={i} className={styles.sectionHeading}>
                                {block.title}
                            </h2>
                        )
                    }

                    if (block.type === 'callout') {
                        if (block.image) {
                            const imgLeft = block.image.position === 'left'
                            return (
                                <div
                                    key={i}
                                    className={`${styles.proseWithImage} ${imgLeft ? styles.imageLeft : styles.imageRight}`}
                                >
                                    <blockquote className={styles.callout}>
                                        {renderRichText(block.content)}
                                    </blockquote>
                                    <figure className={styles.inlineFigure}>
                                        <button
                                            className={styles.imageBtn}
                                            onClick={() => openLightbox(block.image!.src, block.image!.alt)}
                                            aria-label="Open image fullscreen"
                                        >
                                            <Image
                                                src={block.image.src}
                                                alt={block.image.alt}
                                                width={800}
                                                height={600}
                                                style={{ width: '100%', height: 'auto', display: 'block' }}
                                            />
                                        </button>
                                        {block.image.caption && (
                                            <figcaption className={styles.caption}>
                                                {block.image.caption}
                                            </figcaption>
                                        )}
                                    </figure>
                                </div>
                            )
                        }
                        return (
                            <blockquote key={i} className={styles.callout}>
                                {renderRichText(block.content)}
                            </blockquote>
                        )
                    }

                    if (block.type === 'paragraph') {
                        // sideColumn: paragraph (+optional callout) on one side, stacked items on the other
                        if (block.sideColumn) {
                            const sideLeft = block.sideColumn.position === 'left'
                            return (
                                <div
                                    key={i}
                                    className={`${styles.proseWithImage} ${sideLeft ? styles.imageLeft : styles.imageRight}`}
                                >
                                    <div className={styles.proseColumn}>
                                        {block.calloutAbove && (
                                            <blockquote className={styles.callout}>
                                                {renderRichText(block.calloutAbove)}
                                            </blockquote>
                                        )}
                                        <p className={styles.prose}>{renderRichText(block.content)}</p>
                                    </div>
                                    <div className={styles.sideColumn}>
                                        {block.sideColumn.items.map((item, idx) => renderSideItem(item, idx))}
                                    </div>
                                </div>
                            )
                        }

                        // Single inline image
                        if (block.image) {
                            const imgLeft = block.image.position === 'left'
                            return (
                                <div
                                    key={i}
                                    className={`${styles.proseWithImage} ${imgLeft ? styles.imageLeft : styles.imageRight}`}
                                >
                                    <p className={styles.prose}>{renderRichText(block.content)}</p>
                                    <figure className={styles.inlineFigure}>
                                        <button
                                            className={styles.imageBtn}
                                            onClick={() => openLightbox(block.image!.src, block.image!.alt)}
                                            aria-label="Open image fullscreen"
                                        >
                                            <Image
                                                src={block.image.src}
                                                alt={block.image.alt}
                                                width={800}
                                                height={600}
                                                style={{ width: '100%', height: 'auto', display: 'block' }}
                                            />
                                        </button>
                                        {block.image.caption && (
                                            <figcaption className={styles.caption}>
                                                {block.image.caption}
                                            </figcaption>
                                        )}
                                    </figure>
                                </div>
                            )
                        }

                        return (
                            <p key={i} className={styles.prose}>
                                {renderRichText(block.content)}
                            </p>
                        )
                    }

                    if (block.type === 'causes') {
                        return <TwoColumnCauses key={i} causes={block.items} />
                    }

                    if (block.type === 'bullets') {
                        return (
                            <ul key={i} className={styles.bullets}>
                                {block.items.map((item, idx) => (
                                    <li key={idx} className={styles.bulletItem}>
                                        {renderRichText(item)}
                                    </li>
                                ))}
                            </ul>
                        )
                    }

                    // Standalone image block
                    return (
                        <figure key={i} className={styles.inlineImageFigure}>
                            <button
                                className={styles.imageBtn}
                                onClick={() => openLightbox(block.src, block.alt)}
                                aria-label="Open image fullscreen"
                            >
                                <Image
                                    src={block.src}
                                    alt={block.alt}
                                    width={1200}
                                    height={800}
                                    style={{ width: '100%', height: 'auto', display: 'block' }}
                                />
                            </button>
                            {block.caption && (
                                <figcaption className={styles.caption}>{block.caption}</figcaption>
                            )}
                        </figure>
                    )
                })}
            </div>

            {lightboxSrc && (
                <div
                    className={styles.lightboxOverlay}
                    onClick={closeLightbox}
                    role="dialog"
                    aria-modal="true"
                    aria-label="Image lightbox"
                >
                    <button className={styles.lightboxClose} onClick={closeLightbox} aria-label="Close">
                        ✕
                    </button>
                    <div className={styles.lightboxContent} onClick={e => e.stopPropagation()}>
                        <Image
                            src={lightboxSrc}
                            alt={lightboxAlt}
                            fill
                            style={{ objectFit: 'contain' }}
                        />
                    </div>
                </div>
            )}
        </>
    )
}
