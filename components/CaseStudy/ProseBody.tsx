'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import type { ContentBlock, SideItem } from '@/lib/caseStudies'
import { renderRichText } from '@/lib/renderRichText'
import { TwoColumnCauses } from './TwoColumnCauses'
import { TimelinePhase } from './TimelinePhase'
import { RevealTiles } from './RevealTile'
import { CompareContrast } from './CompareContrast'
import { OutcomeGallery } from './OutcomeGallery'
import { AccordionColumns } from './AccordionColumns'
import PhotoStack from '@/components/PhotoStack'
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
                                {block.label && (
                                    <span className={styles.sectionLabel}>{block.label}</span>
                                )}
                            </h2>
                        )
                    }

                    if (block.type === 'proseCallout') {
                        const calloutLeft = (block.calloutPosition ?? 'left') === 'left'
                        const calloutEl = (
                            <blockquote className={`${styles.callout} ${styles.calloutSide}`}>
                                {renderRichText(block.callout)}
                            </blockquote>
                        )
                        const proseEl = (
                            <p className={`${styles.prose} ${styles.proseCalloutProse}`}>
                                {renderRichText(block.prose)}
                            </p>
                        )
                        return (
                            <div key={i} className={styles.proseCalloutRow}>
                                {calloutLeft ? calloutEl : proseEl}
                                {calloutLeft ? proseEl : calloutEl}
                            </div>
                        )
                    }

                    if (block.type === 'callout') {
                        const calloutClass = `${styles.callout}${block.variant === 'centered' ? ` ${styles.calloutCentered}` : ''}`
                        if (block.image) {
                            const imgLeft = block.image.position === 'left'
                            return (
                                <div
                                    key={i}
                                    className={`${styles.proseWithImage} ${imgLeft ? styles.imageLeft : styles.imageRight}`}
                                >
                                    <blockquote className={calloutClass}>
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
                            <blockquote key={i} className={calloutClass}>
                                {renderRichText(block.content)}
                            </blockquote>
                        )
                    }

                    if (block.type === 'subsection') {
                        return <h3 key={i} className={styles.subsection}>{block.title}</h3>
                    }

                    if (block.type === 'twoParagraphs') {
                        return (
                            <div key={i} className={styles.twoParagraphs}>
                                <p className={styles.prose}>{renderRichText(block.left)}</p>
                                <p className={styles.prose}>{renderRichText(block.right)}</p>
                            </div>
                        )
                    }

                    if (block.type === 'revealTiles') {
                        return <RevealTiles key={i} tiles={block.tiles} />
                    }

                    if (block.type === 'compareContrast') {
                        return <CompareContrast key={i} left={block.left} right={block.right} criteria={block.criteria} onImageClick={openLightbox} />
                    }

                    if (block.type === 'outcomeGallery') {
                        return <OutcomeGallery key={i} entries={block.entries} onImageClick={openLightbox} />
                    }

                    if (block.type === 'accordionColumns') {
                        return <AccordionColumns key={i} columns={block.columns} onImageClick={openLightbox} />
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

                    if (block.type === 'timelineGroup') {
                        return (
                            <div key={i}>
                                {block.phases.map((phase, j) => (
                                    <TimelinePhase key={j} {...phase} />
                                ))}
                            </div>
                        )
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

                    if (block.type === 'bulletsWithPhotoStack') {
                        return (
                            <div key={i} className={styles.bulletsWithPhotoStack}>
                                <ul className={`${styles.bullets} ${styles.bulletsNarrative}`}>
                                    {block.items.map((item, idx) => (
                                        <li key={idx} className={styles.bulletItem}>
                                            {renderRichText(item)}
                                        </li>
                                    ))}
                                </ul>
                                <div className={styles.photoStackColumn}>
                                    {block.photoStacks.map((stack, stackIdx) => (
                                        <section key={`${stack.label}-${stackIdx}`} className={styles.photoStackGroup}>
                                            <p className={styles.photoStackLabel}>{stack.label}</p>
                                            <PhotoStack photos={stack.photos} />
                                        </section>
                                    ))}
                                </div>
                            </div>
                        )
                    }

                    // Standalone image block
                    if (block.type !== 'image') return null
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
