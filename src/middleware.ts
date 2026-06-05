import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'coastal-secret-2026-change-in-prod'
)

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get('coastal_admin_token')?.value

  // ── Bảo vệ /admin (BROKER + MASTER đều vào được) ──────────────────────
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    if (!token) return NextResponse.redirect(new URL('/admin/login', request.url))
    try {
      await jwtVerify(token, JWT_SECRET)
    } catch {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  // ── Bảo vệ /master (CHỈ MASTER role mới vào được) ────────────────────
  if (pathname.startsWith('/master') && !pathname.startsWith('/master/login')) {
    if (!token) return NextResponse.redirect(new URL('/master/login', request.url))
    try {
      const { payload } = await jwtVerify(token, JWT_SECRET)
      if (payload.role !== 'MASTER') {
        return NextResponse.redirect(new URL('/master/login', request.url))
      }
    } catch {
      return NextResponse.redirect(new URL('/master/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/master/:path*'],
}
