'use client'

import { useState, useEffect, useCallback } from 'react'
import styles from './RevealTile.module.css'

export interface RevealTileImage {
    src: string
    alt: string
    caption?: string
}

export interface RevealTileData {
    pillar: string
    title: string
    description: string
    images: RevealTileImage[]
}

function RevealTile({ tile }: { tile: RevealTileData }) {
    const [open, setOpen] = useState(false)
    const [lightboxIdx, setLightboxIdx] = useState<number | null>(null)
    const [isTouchDevice, setIsTouchDevice] = useState(false)

    useEffect(() => {
        setIsTouchDevice(window.matchMedia('(hover: none) and (pointer: coarse)').matches)
    }, [])

    const closeLightbox = useCallback(() => setLightboxIdx(null), [])
    const prev = useCallback(() => setLightboxIdx(i => i !== null ? (i - 1 + tile.images.length) % tile.images.length : null), [tile.images.length])
    const next = useCallback(() => setLightboxIdx(i => i !== null ? (i + 1) % tile.images.length : null), [tile.images.length])

    useEffect(() => {
        if (lightboxIdx === null) return
        function onKey(e: KeyboardEvent) {
            if (e.key === 'Escape') closeLightbox()
            if (e.key === 'ArrowLeft') prev()
            if (e.key === 'ArrowRight') next()
        }
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [lightboxIdx, closeLightbox, prev, next])

    const firstImage = tile.images[0]
    const hasMultiple = tile.images.length > 1

    return (
        <>
            <div
                className={`${styles.tile} ${open ? styles.open : ''}`}
                tabIndex={0}
                onClick={isTouchDevice ? () => setOpen(o => !o) : undefined}
                onKeyDown={isTouchDevice ? (e => { if (e.key === 'Enter' || e.key === ' ') setOpen(o => !o) }) : undefined}
                aria-expanded={isTouchDevice ? open : undefined}
            >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={firstImage.src} alt={firstImage.alt} className={styles.image} />
                <div className={styles.overlay}>
                    <div className={styles.overlayText}>
                        <p className={styles.pillar}>{tile.pillar}</p>
                        <p className={styles.title}>{tile.title}</p>
                        <p className={styles.description}>{tile.description}</p>
                    </div>
                    <button
                        className={styles.viewBtn}
                        onClick={e => { e.stopPropagation(); setLightboxIdx(0) }}
                        aria-label={hasMultiple ? 'View image carousel' : 'View full image'}
                    >
                        {hasMultiple ? `View all ${tile.images.length} images →` : 'View full image →'}
                    </button>
                </div>
            </div>

            {lightboxIdx !== null && (
                <div
                    className={styles.lightboxOverlay}
                    onClick={closeLightbox}
                    role="dialog"
                    aria-modal="true"
                    aria-label="Image viewer"
                >
                    <button className={styles.lightboxClose} onClick={closeLightbox} aria-label="Close">✕</button>
                    <div className={styles.lightboxInner} onClick={e => e.stopPropagation()}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={tile.images[lightboxIdx].src}
                            alt={tile.images[lightboxIdx].alt}
                            className={styles.lightboxImg}
                        />
                        {tile.images[lightboxIdx].caption && (
                            <p className={styles.lightboxCaption}>{tile.images[lightboxIdx].caption}</p>
                        )}
                        {hasMultiple && (
                            <p className={styles.lightboxCounter}>{lightboxIdx + 1} / {tile.images.length}</p>
                        )}
                    </div>
                    {hasMultiple && (
                        <>
                            <button className={`${styles.navBtn} ${styles.navPrev}`} onClick={e => { e.stopPropagation(); prev() }} aria-label="Previous">←</button>
                            <button className={`${styles.navBtn} ${styles.navNext}`} onClick={e => { e.stopPropagation(); next() }} aria-label="Next">→</button>
                            <div className={styles.dots} onClick={e => e.stopPropagation()}>
                                {tile.images.map((_, i) => (
                                    <button key={i} className={`${styles.dot} ${i === lightboxIdx ? styles.dotActive : ''}`} onClick={() => setLightboxIdx(i)} aria-label={`Image ${i + 1}`} />
                                ))}
                            </div>
                        </>
                    )}
                </div>
            )}
        </>
    )
}

export function RevealTiles({ tiles }: { tiles: RevealTileData[] }) {
    return (
        <div className={styles.row}>
            {tiles.map((tile, i) => (
                <RevealTile key={i} tile={tile} />
            ))}
        </div>
    )
}
