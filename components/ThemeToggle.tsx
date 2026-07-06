'use client'

import { useEffect, useState } from 'react'
import styles from './ThemeToggle.module.css'

type Theme = 'light' | 'dark'

export default function ThemeToggle() {
    const [theme, setTheme] = useState<Theme>('light')
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        const current = document.documentElement.getAttribute('data-theme')
        setTheme(current === 'dark' ? 'dark' : 'light')
        setMounted(true)
    }, [])

    const toggle = () => {
        const next: Theme = theme === 'dark' ? 'light' : 'dark'
        setTheme(next)
        document.documentElement.setAttribute('data-theme', next)
        localStorage.setItem('theme', next)
    }

    return (
        <button
            type="button"
            onClick={toggle}
            className={styles.toggle}
            aria-label={mounted ? `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode` : 'Toggle color theme'}
        >
            <span aria-hidden="true">{mounted && theme === 'dark' ? '☀' : '☾'}</span>
        </button>
    )
}
