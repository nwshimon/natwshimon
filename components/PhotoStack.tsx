'use client'

import Image from 'next/image'
import type { CSSProperties } from 'react'
import styles from './PhotoStack.module.css'

const photos = [
    { src: '/photos/headshot-nat.png', alt: 'Headshot of Natasha Shimon, an Asian woman with brunette-dyed hair' },
    { src: '/photos/koi-nat.jpg', alt: 'Full body picture of Shimon, playing a blue electric guitar in a band setting' },
    { src: '/photos/sxsw-nat.png', alt: 'A selfie of Shimon wearing a green hat and a SXSW badge.' },
]

interface PhotoStackProps {
    order: number[]
    onPhotoClick: (photoIndex: number) => void
}

export default function PhotoStack({ order, onPhotoClick }: PhotoStackProps) {
    return (
        <div className={styles.stack}>
            {order.map((photoIndex, stackPosition) => {
                const photo = photos[photoIndex]
                return (
                    <button
                        key={photoIndex}
                        type="button"
                        className={styles.photo}
                        style={{
                            zIndex: order.length - stackPosition,
                            '--stack-transform': getTransform(stackPosition),
                        } as CSSProperties}
                        onClick={() => onPhotoClick(photoIndex)}
                        aria-label={`Bring ${photo.alt} to front`}
                    >
                        <Image
                            src={photo.src}
                            alt={photo.alt}
                            fill
                            sizes="(min-width: 768px) 220px, 40vw"
                            style={{ objectFit: 'cover' }}
                        />
                    </button>
                )
            })}
        </div>
    )
}

function getTransform(stackPosition: number) {
    const positions = [
        'translate(0px, 0px) rotate(0deg)',
        'translate(30px, 10px) rotate(-3deg)',
        'translate(60px, 20px) rotate(6deg)',
    ]
    return positions[stackPosition] ?? positions[positions.length - 1]
}