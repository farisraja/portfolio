import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Simple in-memory rate limiter for auth routes
const ipRequestCounts = new Map<string, { count: number; resetTime: number }>()

// Blocklist of suspicious scanner tools / user agents
const BLOCKED_USER_AGENTS = [
  /sqlmap/i,
  /nikto/i,
  /acunetix/i,
  /dirbuster/i,
  /wpscan/i,
  /nmap/i,
  /masscan/i,
  /zgrab/i,
  /eval-stdin/i,
]

// Blocklist of probes for common vulnerability targets
const SENSITIVE_PROBE_PATHS = [
  /\/\.env/i,
  /\/\.git/i,
  /\/\.aws/i,
  /\/\.vscode/i,
  /\/wp-login\.php/i,
  /\/wp-admin/i,
  /\/xmlrpc\.php/i,
  /\/phpmyadmin/i,
  /\/pma/i,
  /\/eval-stdin\.php/i,
]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const userAgent = request.headers.get('user-agent') || ''

  // 1. Blokir Pemindai Kerentanan Otomatis (Vulnerability Scanners)
  for (const pattern of BLOCKED_USER_AGENTS) {
    if (pattern.test(userAgent)) {
      return new NextResponse('Akses Ditolak (Security Shield: Prohibited Scanner Signature)', {
        status: 403,
        headers: { 'Content-Type': 'text/plain' },
      })
    }
  }

  // 2. Blokir Probe File Sensitif & Exploit Targets (.env, .git, wp-login, dll.)
  for (const pattern of SENSITIVE_PROBE_PATHS) {
    if (pattern.test(pathname)) {
      return new NextResponse('Tidak Ditemukan (Protected)', {
        status: 404,
        headers: { 'Content-Type': 'text/plain' },
      })
    }
  }

  // 3. Rate Limiting untuk Endpoint Login & Otentikasi
  const isAuthRoute =
    pathname.startsWith('/api/users/login') ||
    pathname === '/admin/login'

  if (isAuthRoute) {
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip') ||
      '127.0.0.1'

    const now = Date.now()
    const record = ipRequestCounts.get(ip)

    if (record) {
      if (now > record.resetTime) {
        ipRequestCounts.set(ip, { count: 1, resetTime: now + 60 * 1000 })
      } else {
        record.count++
        if (record.count > 12) {
          // Batas 12 percobaan login per menit per IP
          return new NextResponse(
            JSON.stringify({
              error: 'Terlalu banyak percobaan login. Demi keamanan, silakan tunggu 1 menit sebelum mencoba lagi.',
            }),
            {
              status: 429,
              headers: {
                'Content-Type': 'application/json',
                'Retry-After': '60',
              },
            }
          )
        }
      }
    } else {
      ipRequestCounts.set(ip, { count: 1, resetTime: now + 60 * 1000 })
    }
  }

  // Bersihkan cache rate limiter setiap 5 menit agar memori tetap hemat
  if (ipRequestCounts.size > 1000) {
    const now = Date.now()
    for (const [key, value] of ipRequestCounts.entries()) {
      if (now > value.resetTime) {
        ipRequestCounts.delete(key)
      }
    }
  }

  // 4. Lanjutkan request dan sisipkan Security Headers
  const response = NextResponse.next()

  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-Frame-Options', 'SAMEORIGIN')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(), browsing-topics=()'
  )

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}

