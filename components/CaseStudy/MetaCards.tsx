'use client'

import { useState } from 'react'
import { renderRichText } from '@/lib/renderRichText'
import styles from './MetaCards.module.css'

export interface MetaCard {
    label: string
    value: string
    detail: string
}

interface MetaCardsProps {
    cards: MetaCard[][]
}


export function MetaCards({ cards }: MetaCardsProps) {
    const [openCards, setOpenCards] = useState<Record<string, boolean>>({})

    function toggle(colIdx: number, cardIdx: number) {
        const key = `${colIdx}-${cardIdx}`
        setOpenCards(prev => ({ ...prev, [key]: !prev[key] }))
    }

    function isOpen(colIdx: number, cardIdx: number) {
        return openCards[`${colIdx}-${cardIdx}`] ?? false
    }

    return (
        <section className={styles.root}>
            <div className={styles.columns}>
                {cards.map((col, colIdx) => (
                    <div key={colIdx} className={styles.column}>
                        {col.map((card, cardIdx) => {
                            const open = isOpen(colIdx, cardIdx)
                            return (
                                <div
                                    key={cardIdx}
                                    role="button"
                                    tabIndex={0}
                                    aria-expanded={open}
                                    onClick={() => toggle(colIdx, cardIdx)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' || e.key === ' ') {
                                            e.preventDefault()
                                            toggle(colIdx, cardIdx)
                                        }
                                    }}
                                    className={`${styles.card} ${open ? styles.cardOpen : ''}`}
                                >
                                    <div className={styles.cardHeader}>
                                        <div>
                                            <p className={styles.cardLabel}>{card.label}</p>
                                            <p className={styles.cardValue}>{card.value}</p>
                                        </div>
                                        <svg
                                            className={`${styles.chevron} ${open ? styles.chevronOpen : ''}`}
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            aria-hidden="true"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={1.5}
                                                d="M19 9l-7 7-7-7"
                                            />
                                        </svg>
                                    </div>
                                    <div className={`${styles.detail} ${open ? styles.detailOpen : ''}`}>
                                        <div className={styles.detailInner}>{renderRichText(card.detail)}</div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                ))}
            </div>
        </section>
    )
}
