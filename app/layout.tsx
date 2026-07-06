import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import Script from 'next/script'
import { Fraunces, Afacad_Flux } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

// Applies the saved theme before hydration so there's no flash of the wrong palette.
const THEME_INIT_SCRIPT = `
(function () {
    try {
        var stored = localStorage.getItem('theme');
        var theme = stored === 'dark' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', theme);
    } catch (e) {}
})();
`

const fraunces = Fraunces({
    subsets: ['latin'],
    variable: '--font-fraunces',
    display: 'swap',
})

const afacadFlux = Afacad_Flux({
    subsets: ['latin'],
    variable: '--font-afacad',
    display: 'swap',
})

export const metadata: Metadata = {
    title: "natwshimon — portfolio",
    description: "Portfolio of Natasha Wynne Shimon, data scientist and aspiring product manager.",
}

export default function RootLayout({
    children,
}: {
    children: ReactNode
}) {
    return (
        <html lang="en" className={`${fraunces.variable} ${afacadFlux.variable}`}>
            <head>
                <Script id="theme-init" strategy="beforeInteractive">
                    {THEME_INIT_SCRIPT}
                </Script>
            </head>
            <body>
                <Navbar />
                <div className="site-wrapper">
                    {children}
                </div>
                <Footer />
            </body>
        </html>
    )
}