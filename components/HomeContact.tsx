'use client'

import { useState, type SubmitEvent } from 'react'
import styles from './HomeContact.module.css'

type Status = 'idle' | 'sending' | 'sent' | 'error'

export default function HomeContact() {
    const [status, setStatus] = useState<Status>('idle')

    const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        const form = e.currentTarget
        const data = new FormData(form)

        setStatus('sending')

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: data.get('name'),
                    email: data.get('email'),
                    message: data.get('message'),
                }),
            })

            if (!res.ok) throw new Error('Request failed')

            setStatus('sent')
            form.reset()
        } catch {
            setStatus('error')
        }
    }

    return (
        <div className={styles.band}>
            <div className={`site-wrapper ${styles.inner}`}>
                <div className={styles.identity}>
                    {/* <span className={styles.eyebrow}>From the Desk of</span> */}
                    <h2 className={styles.headline}>A note to Nat</h2>
                    <p className={styles.subtext}>For any inquiries, comments, or just to say hi!</p>
                </div>

                <div className={styles.formCol}>
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <div className={styles.field}>
                            <label htmlFor="contact-name" className={styles.label}>Name</label>
                            <input id="contact-name" name="name" type="text" required className={styles.input} />
                        </div>
                        <div className={styles.field}>
                            <label htmlFor="contact-email" className={styles.label}>Email</label>
                            <input id="contact-email" name="email" type="email" required className={styles.input} />
                        </div>
                        <div className={styles.field}>
                            <label htmlFor="contact-message" className={styles.label}>Message</label>
                            <input id="contact-message" name="message" type="text" required className={styles.input} />
                        </div>
                        <button type="submit" className={styles.submit} disabled={status === 'sending'}>
                            {status === 'sending' ? 'Sending…' : <>SEND &rarr;</>}
                        </button>
                    </form>

                    {status === 'sent' && <p className={styles.statusMessage}>Thanks — message sent.</p>}
                    {status === 'error' && (
                        <p className={styles.statusMessage}>
                            Something went wrong — email me directly at{' '}
                            <a href="mailto:nshimon@umich.edu">nshimon@umich.edu</a>.
                        </p>
                    )}

                    <div className={styles.quickLinks}>
                        <a
                            href="https://www.linkedin.com/in/natasha-shimon/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.quickLink}
                        >
                            LinkedIn
                        </a>
                        <a href="mailto:nshimon@umich.edu" className={styles.quickLink}>Email</a>
                        <a
                            href="https://github.com/natwshimon"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.quickLink}
                        >
                            GitHub
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}
