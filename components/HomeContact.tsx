import styles from './HomeContact.module.css'

export default function HomeContact() {
    return (
        <section className={styles.wrapper}>
            <div className={styles.module}>
                <div className={styles.content}>
                    <div className={styles.heading}>
                        <span className={styles.eyebrow}>Get In Touch</span>
                        <h2 className={styles.headline}>Say hello</h2>
                        <p className={styles.subtext}>Reach out about roles, collaborations, or anything on this site.</p>
                    </div>

                    <form
                        className={styles.form}
                        action="mailto:nshimon@umich.edu"
                        method="post"
                        encType="text/plain"
                    >
                        <div className={styles.formRow}>
                            <div className={styles.field}>
                                <label htmlFor="contact-name" className={styles.label}>Name</label>
                                <input id="contact-name" name="Name" type="text" required className={styles.input} />
                            </div>
                            <div className={styles.field}>
                                <label htmlFor="contact-email" className={styles.label}>Email</label>
                                <input id="contact-email" name="Email" type="email" required className={styles.input} />
                            </div>
                        </div>
                        <div className={styles.field}>
                            <label htmlFor="contact-subject" className={styles.label}>Subject</label>
                            <input id="contact-subject" name="Subject" type="text" className={styles.input} />
                        </div>
                        <div className={styles.field}>
                            <label htmlFor="contact-message" className={styles.label}>Message</label>
                            <textarea id="contact-message" name="Message" rows={4} required className={styles.textarea} />
                        </div>
                        <button type="submit" className={styles.submit}>SEND →</button>
                    </form>

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
        </section>
    )
}
