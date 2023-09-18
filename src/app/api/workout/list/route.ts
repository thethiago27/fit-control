import { PrismaWorkoutListRepository } from '@/infra/database/prisma/repositories/workout-list.repository'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const workoutList = await PrismaWorkoutListRepository.getAll()

    return NextResponse.json(workoutList)
  } catch (e) {
    return new Response('', {
      status: 500,
      headers: {
        'content-type': 'application/json',
      },
    })
  }
}
