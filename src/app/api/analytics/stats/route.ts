import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const payload = await getPayload({ config })

    // Ambil 100 log terakhir untuk statistik cepat
    const logs = await payload.find({
      collection: 'visitor-logs',
      sort: '-createdAt',
      limit: 100,
    })

    const totalCount = logs.totalDocs || 0
    const docs = logs.docs || []

    // Hitung pengunjung unik berdasarkan hash
    const uniqueHashes = new Set(docs.map((d: any) => d.visitorHash).filter(Boolean))
    const uniqueCount = uniqueHashes.size

    // Hitung negara teratas
    const countryMap: Record<string, number> = {}
    docs.forEach((d: any) => {
      const code = d.countryCode || 'ID'
      if (code !== 'LOCAL') {
        countryMap[code] = (countryMap[code] || 0) + 1
      }
    })

    const topCountries = Object.entries(countryMap)
      .map(([code, count]) => ({ code, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5)

    // Kunjungan terakhir (data publik aman, tanpa hash atau IP)
    const recentVisits = docs
      .filter((d: any) => d.deviceType !== 'Bot')
      .slice(0, 5)
      .map((d: any) => ({
        pathname: d.pathname,
        countryCode: d.countryCode,
        country: d.country,
        city: d.city,
        createdAt: d.createdAt,
      }))

    return NextResponse.json({
      success: true,
      totalVisits: totalCount,
      sampleUnique: uniqueCount,
      topCountries,
      recentVisits,
    })
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        totalVisits: 0,
        sampleUnique: 0,
        topCountries: [],
        recentVisits: [],
        error: error?.message,
      },
      { status: 200 }
    )
  }
}
