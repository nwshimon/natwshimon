'use client'

import { useState } from 'react'
import styles from './CompareContrast.module.css'

export interface CompareCard {
    src: string
    alt: string
    primaryLabel: string
    secondaryLabel: string
}

export interface CompareCriterion {
    key: string
    label: string
    leftPass: boolean
    rightPass: boolean
    explanation: string
}

interface CompareContrastProps {
    left: CompareCard
    right: CompareCard
    criteria: CompareCriterion[]
    onImageClick: (src: string, alt: string) => void
}

function Tag({
    criterion,
    pass,
    open,
    onClick,
}: {
    criterion: CompareCriterion
    pass: boolean
    open: boolean
    onClick: () => void
}) {
    return (
        <button
            type="button"
            className={`${styles.tag} ${pass ? styles.tagPass : styles.tagFail} ${open ? styles.tagOpen : ''}`}
            onClick={onClick}
            aria-expanded={open}
        >
            <span className={styles.tagIcon} aria-hidden="true">{pass ? '✓' : '✗'}</span>
            {criterion.label}
        </button>
    )
}

function Card({
    card,
    criteria,
    side,
    openKey,
    onToggle,
    onImageClick,
}: {
    card: CompareCard
    criteria: CompareCriterion[]
    side: 'left' | 'right'
    openKey: string | null
    onToggle: (key: string) => void
    onImageClick: (src: string, alt: string) => void
}) {
    return (
        <div className={styles.card}>
            <button
                type="button"
                className={styles.imageBtn}
                onClick={() => onImageClick(card.src, card.alt)}
                aria-label="Open image fullscreen"
            >
                <div className={styles.imageWrap}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={card.src} alt={card.alt} className={styles.image} />
                </div>
            </button>
            <div className={styles.labels}>
                <p className={styles.primary}>{card.primaryLabel}</p>
                <p className={styles.secondary}>{card.secondaryLabel}</p>
            </div>
            <div className={styles.tags}>
                {criteria.map(criterion => (
                    <Tag
                        key={criterion.key}
                        criterion={criterion}
                        pass={side === 'left' ? criterion.leftPass : criterion.rightPass}
                        open={openKey === criterion.key}
                        onClick={() => onToggle(criterion.key)}
                    />
                ))}
            </div>
        </div>
    )
}

export function CompareContrast({ left, right, criteria, onImageClick }: CompareContrastProps) {
    const [openKey, setOpenKey] = useState<string | null>(null)

    function handleToggle(key: string) {
        setOpenKey(prev => (prev === key ? null : key))
    }

    const openCriterion = criteria.find(c => c.key === openKey) ?? null

    return (
        <div className={styles.root}>
            <div className={styles.cardsRow}>
                <Card card={left} criteria={criteria} side="left" openKey={openKey} onToggle={handleToggle} onImageClick={onImageClick} />
                <div className={styles.vs} aria-hidden="true">vs</div>
                <Card card={right} criteria={criteria} side="right" openKey={openKey} onToggle={handleToggle} onImageClick={onImageClick} />
            </div>

            <div className={`${styles.panel} ${openCriterion ? styles.panelOpen : ''}`}>
                <div className={styles.panelInner}>
                    {openCriterion && (
                        <>
                            <p className={styles.panelLabel}>{openCriterion.label}</p>
                            <p className={styles.panelText}>{openCriterion.explanation}</p>
                        </>
                    )}
                </div>
            </div>

            <p className={styles.hint}>tap a tag to read the full reasoning</p>
        </div>
    )
}
