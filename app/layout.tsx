import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { Fraunces, Afacad_Flux } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'

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
            <body>
                <Navbar />
                <div className="site-wrapper">
                    {children}
                </div>
            </body>
        </html>
    )
}