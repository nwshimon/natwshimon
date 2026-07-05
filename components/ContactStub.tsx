'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, type MouseEvent } from 'react'
import styles from './ContactStub.module.css'

interface ContactStubProps {
    animationDelay?: string
}

const TEAR_DURATION_MS = 450

export default function ContactStub({ animationDelay }: ContactStubProps) {
    const router = useRouter()
    const [isTearing, setIsTearing] = useState(false)

    const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) {
            return
        }
        e.preventDefault()
        setIsTearing(true)
        setTimeout(() => router.push('/contact'), TEAR_DURATION_MS)
    }

    return (
        <Link
            href="/contact"
            className={styles.stub}
            style={animationDelay ? { animationDelay } : undefined}
            onClick={handleClick}
        >
            <div className={styles.stubBody}>
                <div className={styles.bottom}>
                    <span className={styles.cta}>Get In Touch</span>
                </div>
            </div>
            <div className={styles.tearLine} aria-hidden="true" />
            <div className={`${styles.admitSection} ${isTearing ? styles.tornOff : ''}`}>
            </div>
        </Link>
    )
}
