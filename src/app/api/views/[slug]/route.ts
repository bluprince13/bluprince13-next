import { NextRequest, NextResponse } from 'next/server'
import db from '@Modules/firebase'

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const snapshot = await db.ref('views').child(slug).once('value')
  const views = snapshot.val()
  return NextResponse.json({ total: views })
}

export async function POST(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const ref = db.ref('views').child(slug)
  const { snapshot } = await ref.transaction((currentViews: number | null) => {
    if (currentViews === null) {
      return 1
    }
    return currentViews + 1
  })
  return NextResponse.json({
    total: snapshot.val()
  })
}
