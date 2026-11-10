import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'
import crypto from 'crypto'

export const dynamic = 'force-dynamic'

function parseUserAgent(ua: string): {
  deviceType: 'Desktop' | 'Mobile' | 'Tablet' | 'Bot' | 'Other'
  browser: string
  os: string
} {
  if (!ua) {
    return { deviceType: 'Other', browser: 'Unknown', os: 'Unknown' }
  }

  // Deteksi Bot & Crawler
  if (
    /bot|crawler|spider|crawling|googlebot|bingbot|slurp|duckduckbot|baiduspider|yandexbot|facebookexternalhit|whatsapp|telegrambot|semrush|ahrefs|lighthouse|headless/i.test(
      ua
    )
  ) {
    return { deviceType: 'Bot', browser: 'Bot / Crawler', os: 'Crawler' }
  }

  // Deteksi Tipe Perangkat
  let deviceType: 'Desktop' | 'Mobile' | 'Tablet' | 'Other' = 'Desktop'
  if (/ipad|tablet|(android(?!.*mobile))/i.test(ua)) {
    deviceType = 'Tablet'
  } else if (/mobile|iphone|ipod|android|blackberry|iemobile|kindle/i.test(ua)) {
    deviceType = 'Mobile'
  }

  // Deteksi Browser
  let browser = 'Unknown'
  if (ua.includes('Edg/')) browser = 'Edge'
  else if (ua.includes('Chrome/')) browser = 'Chrome'
  else if (ua.includes('Safari/') && !ua.includes('Chrome/')) browser = 'Safari'
  else if (ua.includes('Firefox/')) browser = 'Firefox'
  else if (ua.includes('OPR/') || ua.includes('Opera/')) browser = 'Opera'

  // Deteksi OS
  let os = 'Unknown'
  if (ua.includes('Win')) os = 'Windows'
  else if (ua.includes('Mac OS') && !ua.includes('iPhone') && !ua.includes('iPad')) os = 'macOS'
  else if (ua.includes('Android')) os = 'Android'
  else if (ua.includes('iPhone') || ua.includes('iPad') || ua.includes('iPod')) os = 'iOS'
  else if (ua.includes('Linux')) os = 'Linux'

  return { deviceType, browser, os }
}

function extractReferrerDomain(referrer?: string | null): string {
  if (!referrer || referrer.trim() === '') return 'Direct'
  try {
    const url = new URL(referrer)
    const host = url.hostname.replace(/^www\./, '')
    if (host.includes('linkedin')) return 'linkedin.com'
    if (host.includes('github')) return 'github.com'
    if (host.includes('google')) return 'google.com'
    if (host.includes('instagram')) return 'instagram.com'
    if (host.includes('twitter') || host.includes('x.com')) return 'x.com'
    if (host.includes('localhost') || host.includes('vercel.app')) return 'Internal'
    return host
  } catch {
    return 'Other'
  }
}

function getCountryName(countryCode?: string | null): string {
  if (!countryCode || countryCode === 'LOCAL') return 'Lokal / Pengembang'
  try {
    const regionNames = new Intl.DisplayNames(['id', 'en'], { type: 'region' })
    return regionNames.of(countryCode) || countryCode
  } catch {
    return countryCode
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}))
    const rawPath = body.pathname || '/'
    const rawReferrer = body.referrer || req.headers.get('referer') || ''

    // Ekstraksi header geolokasi dari Edge Vercel
    const countryCode = req.headers.get('x-vercel-ip-country') || (process.env.NODE_ENV === 'development' ? 'LOCAL' : 'ID')
    const city = req.headers.get('x-vercel-ip-city') || (countryCode === 'LOCAL' ? 'Lokal Dev' : 'Indonesia')
    const region = req.headers.get('x-vercel-ip-country-region') || ''
    const country = getCountryName(countryCode)

    // Ekstraksi IP & Anonimisasi dengan Hashing
    const forwardedFor = req.headers.get('x-forwarded-for') || ''
    const clientIp = forwardedFor.split(',')[0].trim() || '127.0.0.1'

    // Salt harian agar hash berganti tiap hari (tidak bisa di-reverse untuk pelacakan jangka panjang)
    const today = new Date().toISOString().slice(0, 10)
    const secret = process.env.PAYLOAD_SECRET || 'faris-analytics-salt'
    const visitorHash = crypto
      .createHash('sha256')
      .update(`${clientIp}-${today}-${secret}`)
      .digest('hex')
      .substring(0, 16)

    // Parsing User-Agent
    const userAgent = req.headers.get('user-agent') || ''
    const { deviceType, browser, os } = parseUserAgent(userAgent)

    // Deteksi Domain Perujuk
    const referrerDomain = extractReferrerDomain(rawReferrer)

    // Abaikan logging jika berasal dari navigasi internal antar halaman portofolio sendiri
    // (kecuali halaman pertama kali dibuka)
    const isInternal = referrerDomain === 'Internal' && body.isInitialNavigation === false
    if (isInternal) {
      return NextResponse.json({ success: true, ignored: 'internal_navigation' })
    }

    const payload = await getPayload({ config })

    await payload.create({
      collection: 'visitor-logs',
      data: {
        pathname: rawPath,
        referrer: rawReferrer ? rawReferrer.slice(0, 500) : '',
        referrerDomain,
        country,
        countryCode: countryCode.toUpperCase(),
        city,
        region,
        deviceType,
        browser,
        os,
        visitorHash,
        userAgent: userAgent.slice(0, 500),
      },
    })

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Visitor tracking error:', error?.message)
    // Always return 200 OK so client performance is never affected
    return NextResponse.json({ success: false, error: error?.message }, { status: 200 })
  }
}
