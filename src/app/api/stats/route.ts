import { NextResponse } from 'next/server'
import { Redis } from '@upstash/redis'
import { getCurrentBroker } from '@/lib/currentBroker'

const redis = process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
  ? new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    })
  : null

// Fake data cho môi trường chưa setup Redis
const FAKE_VIEWS = 1248
const FAKE_LIKES = 87

export async function GET() {
  const broker = await getCurrentBroker()
  const prefix = broker ? broker.id : 'default'

  if (!redis) {
    return NextResponse.json({ views: FAKE_VIEWS, likes: FAKE_LIKES })
  }

  try {
    const views = await redis.get(`${prefix}_views`) || FAKE_VIEWS
    const likes = await redis.get(`${prefix}_likes`) || FAKE_LIKES

    return NextResponse.json({
      views: Number(views),
      likes: Number(likes),
    })
  } catch (error) {
    console.error('Redis GET error:', error)
    return NextResponse.json({ views: FAKE_VIEWS, likes: FAKE_LIKES })
  }
}

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url)
  const action = searchParams.get('action')
  
  const broker = await getCurrentBroker()
  const prefix = broker ? broker.id : 'default'

  if (!redis) {
    return NextResponse.json({ success: true, fake: true })
  }

  try {
    let result = 0
    if (action === 'view') {
      result = await redis.incr(`${prefix}_views`)
    } else if (action === 'like') {
      result = await redis.incr(`${prefix}_likes`)
    } else if (action === 'unlike') {
      result = await redis.decr(`${prefix}_likes`)
    } else {
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
    }

    return NextResponse.json({ success: true, value: result })
  } catch (error) {
    console.error('Redis POST error:', error)
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 })
  }
}
