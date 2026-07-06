'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import styles from './ContactGallery.module.css'

interface Photo {
    src: string
    alt: string
}

export default function ContactGallery({ photos }: { photos: Photo[] }) {
    const [activeIdx, setActiveIdx] = useState<number | null>(null)

    const close = useCallback(() => setActiveIdx(null), [])
    const prev = useCallback(
        () => setActiveIdx((i) => (i !== null ? (i - 1 + photos.length) % photos.length : null)),
        [photos.length]
    )
    const next = useCallback(
        () => setActiveIdx((i) => (i !== null ? (i + 1) % photos.length : null)),
        [photos.length]
    )

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
            <div className={styles.gallery}>
                {photos.map((photo, i) => (
                    <button
                        key={photo.src}
                        className={styles.photoTile}
                        onClick={() => setActiveIdx(i)}
                        aria-label={`Open photo: ${photo.alt}`}
                    >
                        <Image
                            src={photo.src}
                            alt={photo.alt}
                            fill
                            sizes="(min-width: 768px) 50vw, 90vw"
                            style={{ objectFit: 'cover' }}
                        />
                    </button>
                ))}
            </div>

            {activeIdx !== null && (
                <div
                    className={styles.overlay}
                    onClick={close}
                    role="dialog"
                    aria-modal="true"
                    aria-label="Photo lightbox"
                >
                    <button className={styles.closeBtn} onClick={close} aria-label="Close">✕</button>

                    <div className={styles.lightboxInner} onClick={(e) => e.stopPropagation()}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={photos[activeIdx].src}
                            alt={photos[activeIdx].alt}
                            className={styles.lightboxImg}
                        />
                    </div>

                    {photos.length > 1 && (
                        <>
                            <button
                                className={`${styles.navBtn} ${styles.navPrev}`}
                                onClick={(e) => { e.stopPropagation(); prev() }}
                                aria-label="Previous photo"
                            >←</button>
                            <button
                                className={`${styles.navBtn} ${styles.navNext}`}
                                onClick={(e) => { e.stopPropagation(); next() }}
                                aria-label="Next photo"
                            >→</button>
                            <div className={styles.dots} onClick={(e) => e.stopPropagation()}>
                                {photos.map((_, i) => (
                                    <button
                                        key={i}
                                        className={`${styles.dot} ${i === activeIdx ? styles.dotActive : ''}`}
                                        onClick={() => setActiveIdx(i)}
                                        aria-label={`Go to photo ${i + 1}`}
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
