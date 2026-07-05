import { NextResponse } from 'next/server'
import { Resend } from 'resend'

export async function POST(request: Request) {
    const { name, email, message } = await request.json()

    if (!name || !email || !message) {
        return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 })
    }

    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
        return NextResponse.json({ error: 'Contact form is not configured.' }, { status: 500 })
    }

    const resend = new Resend(apiKey)

    const { error } = await resend.emails.send({
        from: 'Portfolio Contact Form <onboarding@resend.dev>',
        to: 'nshimon@umich.edu',
        replyTo: email,
        subject: `New message from ${name}`,
        text: `From: ${name} <${email}>\n\n${message}`,
    })

    if (error) {
        return NextResponse.json({ error: 'Failed to send message.' }, { status: 502 })
    }

    return NextResponse.json({ ok: true })
}
