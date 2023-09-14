import { NextResponse } from 'next/server'
import { WorkoutLogRepository } from '@/infra/database/prisma/repositories/workout-log.repository'

import { cookies } from 'next/headers'
import { JwtStrategy } from '@/infra/http/auth/jwt.strategy'

export async function GET() {
  try {
    const token = cookies().get('token')

    if (!token) {
      return NextResponse.json({
        active: false,
      })
    }

    const userId = await JwtStrategy.verifyToken()

    const hasWorkoutInProgress =
      await WorkoutLogRepository.checkHasCurrentWorkout(userId.id)

    if (hasWorkoutInProgress) {
      return NextResponse.json({
        workoutTypeId: hasWorkoutInProgress.workoutListId,
        workoutLogId: hasWorkoutInProgress.id,
        active: true,
      })
    }

    return NextResponse.json({
      active: false,
    })
  } catch (e) {
    return new Response(`${e}`, {
      status: 401,
    })
  }
}
