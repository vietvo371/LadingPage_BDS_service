import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const data = await request.json()
    console.log('--- API /lead RECEIVED DATA ---:', data)
    const sheetUrl = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_URL

    if (!sheetUrl) {
      console.warn('Google Sheets Webhook URL is missing')
      // Fallback response cho môi trường dev chưa setup
      return NextResponse.json({ success: true, fake: true })
    }

    // Gửi dữ liệu tới Google Sheets
    const response = await fetch(sheetUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(data),
      redirect: 'follow'
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Google Sheets Error Response:', errorText)
      throw new Error(`Failed to send data to Google Sheets. Status: ${response.status}`)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error in /api/lead:', error)
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 })
  }
}
