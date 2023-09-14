import { WorkoutLogRepository } from '@/infra/database/prisma/repositories/workout-log.repository'
import { NextResponse } from 'next/server'

import { cookies } from 'next/headers'
import { JwtStrategy } from '@/infra/http/auth/jwt.strategy'

export async function GET() {
  try {
    const userId = await JwtStrategy.verifyToken()

    const hasWorkoutInProgress =
      await WorkoutLogRepository.checkHasCurrentWorkout(String(userId.id))

    if (!hasWorkoutInProgress) {
      return NextResponse.json({
        active: false,
      })
    }

    return NextResponse.json({
      active: !!hasWorkoutInProgress,
      workoutTypeId: hasWorkoutInProgress.id,
    })
  } catch (e) {
    return new Response('', {
      status: 401,
      headers: {
        'content-type': 'application/json',
      },
    })
  }
}
