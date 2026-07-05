'use client'

import { useState, useEffect, useCallback } from 'react'
import styles from './PhaseMedia.module.css'
import type { PhaseMediaImage } from '@/lib/caseStudies'

interface PhaseMediaProps {
    images: PhaseMediaImage[]
}

export function PhaseMedia({ images }: PhaseMediaProps) {
    const [activeIdx, setActiveIdx] = useState<number | null>(null)

    const close = useCallback(() => setActiveIdx(null), [])
    const prev = useCallback(() => setActiveIdx(i => i !== null ? (i - 1 + images.length) % images.length : null), [images.length])
    const next = useCallback(() => setActiveIdx(i => i !== null ? (i + 1) % images.length : null), [images.length])

    useEffect(() => {
        if (activeIdx === null) return
        function onKey(e: KeyboardEvent) {
            if (e.key === 'Escape') close()
            if (e.key === 'ArrowLeft') prev()
            if (e.key === 'ArrowRight') next()
        }
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [activeIdx, close, prev, next])

    return (
        <>
            <div className={styles.thumbnails}>
                {images.map((img, i) => (
                    <button
                        key={i}
                        className={styles.thumbBtn}
                        onClick={() => setActiveIdx(i)}
                        aria-label={`Open image: ${img.alt}`}
                    >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={img.src} alt={img.alt} className={styles.thumb} />
                    </button>
                ))}
            </div>

            {activeIdx !== null && (
                <div
                    className={styles.overlay}
                    onClick={close}
                    role="dialog"
                    aria-modal="true"
                    aria-label="Image lightbox"
                >
                    <button className={styles.closeBtn} onClick={close} aria-label="Close">✕</button>

                    <div className={styles.lightboxInner} onClick={e => e.stopPropagation()}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={images[activeIdx].src}
                            alt={images[activeIdx].alt}
                            className={styles.lightboxImg}
                        />
                        {images[activeIdx].caption && (
                            <p className={styles.lightboxCaption}>{images[activeIdx].caption}</p>
                        )}
                    </div>

                    {images.length > 1 && (
                        <>
                            <button
                                className={`${styles.navBtn} ${styles.navPrev}`}
                                onClick={e => { e.stopPropagation(); prev() }}
                                aria-label="Previous image"
                            >←</button>
                            <button
                                className={`${styles.navBtn} ${styles.navNext}`}
                                onClick={e => { e.stopPropagation(); next() }}
                                aria-label="Next image"
                            >→</button>
                            <div className={styles.dots} onClick={e => e.stopPropagation()}>
                                {images.map((_, i) => (
                                    <button
                                        key={i}
                                        className={`${styles.dot} ${i === activeIdx ? styles.dotActive : ''}`}
                                        onClick={() => setActiveIdx(i)}
                                        aria-label={`Go to image ${i + 1}`}
                                    />
                                ))}
                            </div>
                        </>
                    )}
                </div>
            )}
        </>
    )
}
