import { NextResponse } from 'next/server'

// This API route is prepared for Resend email integration
// To enable:
// 1. Install: pnpm add resend
// 2. Set RESEND_API_KEY environment variable
// 3. Uncomment the Resend code below

// import { Resend } from 'resend'
// const resend = new Resend(process.env.RESEND_API_KEY)

interface ContactFormData {
  name: string
  email: string
  company?: string
  businessType: 'restaurant' | 'hotel' | 'distributor' | 'caterer' | 'other'
  message: string
  locale: 'en' | 'zh'
}

export async function POST(request: Request) {
  try {
    const body: ContactFormData = await request.json()
    const { name, email, company, businessType, message, locale } = body

    // Validate required fields
    if (!name || !email || !message || !businessType) {
      return NextResponse.json(
        { error: locale === 'en' ? 'Missing required fields' : '缺少必填字段' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: locale === 'en' ? 'Invalid email format' : '邮箱格式无效' },
        { status: 400 }
      )
    }

    // TODO: Send email via Resend
    // Uncomment when Resend is configured:
    /*
    await resend.emails.send({
      from: 'Master 2 Website <noreply@master2.com>',
      to: ['sales@master2.com'],
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company || 'Not provided'}</p>
        <p><strong>Business Type:</strong> ${businessType}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    })
    */

    // For now, just log the submission
    console.log('Contact form submission:', { name, email, company, businessType, message })

    return NextResponse.json({
      success: true,
      message: locale === 'en' 
        ? 'Thank you for your message. We will contact you shortly.'
        : '感谢您的留言，我们会尽快与您联系。',
    })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
