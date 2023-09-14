import { PrismaWorkoutListRepository } from '@/infra/database/prisma/repositories/workout-list.repository'
import { NextResponse } from 'next/server'

export async function GET() {
  const workoutList = await PrismaWorkoutListRepository.getAll()

  return NextResponse.json(workoutList)
}
