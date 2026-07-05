'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import type { CSSProperties } from 'react'
import styles from './PhotoStack.module.css'

interface PhotoStackImage {
    src: string
    alt: string
}

const defaultPhotos: PhotoStackImage[] = [
    { src: '/photos/headshot-nat.png', alt: 'Headshot of Natasha Shimon, an Asian woman with brunette-dyed hair' },
    { src: '/photos/koi-nat.jpg', alt: 'Full body picture of Shimon, playing a blue electric guitar in a band setting' },
    { src: '/photos/sxsw-nat.png', alt: 'A selfie of Shimon wearing a green hat and a SXSW badge.' },
]

interface PhotoStackProps {
    photos?: PhotoStackImage[]
    className?: string
}

export default function PhotoStack({ photos = defaultPhotos, className }: PhotoStackProps) {
    const [order, setOrder] = useState<number[]>(photos.map((_, idx) => idx))
    const [ratios, setRatios] = useState<Record<number, number>>({})
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

    useEffect(() => {
        setOrder(photos.map((_, idx) => idx))
        setLightboxIndex(null)
    }, [photos])

    useEffect(() => {
        let cancelled = false

        async function loadRatios() {
            const loaded = await Promise.all(
                photos.map(
                    (photo, idx) =>
                        new Promise<[number, number]>((resolve) => {
                            const img = new window.Image()
                            img.onload = () => {
                                const safeRatio = img.naturalWidth > 0 && img.naturalHeight > 0
                                    ? img.naturalWidth / img.naturalHeight
                                    : 3 / 4
                                resolve([idx, safeRatio])
                            }
                            img.onerror = () => resolve([idx, 3 / 4])
                            img.src = photo.src
                        })
                )
            )

            if (cancelled) return
            setRatios(Object.fromEntries(loaded))
        }

        loadRatios()
        return () => {
            cancelled = true
        }
    }, [photos])

    function onPhotoClick(photoIndex: number) {
        setOrder(prev => [photoIndex, ...prev.filter(idx => idx !== photoIndex)])
    }

    useEffect(() => {
        if (lightboxIndex === null) return
        function onKeyDown(e: KeyboardEvent) {
            if (e.key === 'Escape') setLightboxIndex(null)
        }
        window.addEventListener('keydown', onKeyDown)
        return () => window.removeEventListener('keydown', onKeyDown)
    }, [lightboxIndex])

    return (
        <>
            <div className={`${styles.stack} ${className ?? ''}`}>
                {order.map((photoIndex, stackPosition) => {
                    const photo = photos[photoIndex]
                    return (
                        <div
                            key={`${photo.src}-${photoIndex}`}
                            className={styles.photo}
                            style={{
                                zIndex: order.length - stackPosition,
                                '--stack-transform': getTransform(stackPosition),
                                '--photo-aspect': ratios[photoIndex] ?? 3 / 4,
                                '--stack-overlay-opacity': stackPosition === 0
                                    ? 0
                                    : Math.min(0.14 + stackPosition * 0.06, 0.34),
                            } as CSSProperties}
                            role="button"
                            tabIndex={0}
                            onClick={() => onPhotoClick(photoIndex)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault()
                                    onPhotoClick(photoIndex)
                                }
                            }}
                            aria-label={`Bring ${photo.alt} to front`}
                        >
                            <Image
                                src={photo.src}
                                alt={photo.alt}
                                fill
                                sizes="(min-width: 768px) 320px, 70vw"
                                style={{ objectFit: 'contain' }}
                            />
                            <button
                                type="button"
                                className={styles.expandBtn}
                                onClick={(e) => {
                                    e.stopPropagation()
                                    setLightboxIndex(photoIndex)
                                }}
                                aria-label={`View ${photo.alt} full size`}
                            >
                                <span className={styles.expandIcon} aria-hidden="true" />
                            </button>
                        </div>
                    )
                })}
            </div>

            {lightboxIndex !== null && (
                <div
                    className={styles.lightboxOverlay}
                    onClick={() => setLightboxIndex(null)}
                    role="dialog"
                    aria-modal="true"
                    aria-label="Photo lightbox"
                >
                    <button
                        type="button"
                        className={styles.lightboxClose}
                        onClick={() => setLightboxIndex(null)}
                        aria-label="Close full-size view"
                    >
                        Close
                    </button>
                    <div className={styles.lightboxInner} onClick={(e) => e.stopPropagation()}>
                        <Image
                            src={photos[lightboxIndex].src}
                            alt={photos[lightboxIndex].alt}
                            fill
                            sizes="95vw"
                            style={{ objectFit: 'contain' }}
                        />
                    </div>
                </div>
            )}
        </>
    )
}

function getTransform(stackPosition: number) {
    const positions = [
        'translate(0px, 0px) rotate(0deg)',
        'translate(52px, 12px) rotate(-3deg)',
        'translate(104px, 24px) rotate(5deg)',
        'translate(152px, 36px) rotate(-2deg)',
        'translate(198px, 48px) rotate(4deg)',
    ]
    return positions[stackPosition] ?? positions[positions.length - 1]
}