import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

// GET all tasks
export async function GET() {
  const tasks = await prisma.task.findMany({
    orderBy: { createdAt: 'desc' },
  })
  return NextResponse.json(tasks)
}

// POST new task
export async function POST(req: Request) {
  const body = await req.json()
  const { title,description } = body

  if (!title) {
    return NextResponse.json({ error: 'Title is required' }, { status: 400 })
  }

  const task = await prisma.task.create({
    data: { title,description  },
  })

  return NextResponse.json(task)
}
