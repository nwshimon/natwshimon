'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import styles from './ContactGallery.module.css'

interface Photo {
    src: string
    alt: string
}

const FOCUSABLE_SELECTOR = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'

export default function ContactGallery({ photos }: { photos: Photo[] }) {
    const [activeIdx, setActiveIdx] = useState<number | null>(null)
    const overlayRef = useRef<HTMLDivElement>(null)
    const closeBtnRef = useRef<HTMLButtonElement>(null)
    const lastFocusedRef = useRef<HTMLElement | null>(null)

    const close = useCallback(() => setActiveIdx(null), [])
    const prev = useCallback(
        () => setActiveIdx((i) => (i !== null ? (i - 1 + photos.length) % photos.length : null)),
        [photos.length]
    )
    const next = useCallback(
        () => setActiveIdx((i) => (i !== null ? (i + 1) % photos.length : null)),
        [photos.length]
    )

    // Move focus into the dialog on open, and back to the trigger on close.
    useEffect(() => {
        if (activeIdx === null) return
        lastFocusedRef.current = document.activeElement as HTMLElement
        closeBtnRef.current?.focus()
        return () => lastFocusedRef.current?.focus()
    }, [activeIdx === null])

    useEffect(() => {
        if (activeIdx === null) return
        function onKey(e: KeyboardEvent) {
            if (e.key === 'Escape') close()
            if (e.key === 'ArrowLeft') prev()
            if (e.key === 'ArrowRight') next()

            if (e.key === 'Tab') {
                const focusable = overlayRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
                if (!focusable || focusable.length === 0) return
                const first = focusable[0]
                const last = focusable[focusable.length - 1]

                if (e.shiftKey && document.activeElement === first) {
                    e.preventDefault()
                    last.focus()
                } else if (!e.shiftKey && document.activeElement === last) {
                    e.preventDefault()
                    first.focus()
                }
            }
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

            {activeIdx !== null && createPortal(
                <div
                    ref={overlayRef}
                    className={styles.overlay}
                    onClick={close}
                    role="dialog"
                    aria-modal="true"
                    aria-label="Photo lightbox"
                >
                    <button ref={closeBtnRef} className={styles.closeBtn} onClick={close} aria-label="Close">✕</button>

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
                </div>,
                document.body
            )}
        </>
    )
}
