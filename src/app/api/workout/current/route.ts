import { JwtStrategy } from '@/infra/http/auth/jwt.strategy'
import { PrismaWorkoutLogRepository } from '@/infra/database/prisma/repositories/workout-log.repository'
import { prisma } from '@/infra/database/prisma/prisma'
import { GetCurrentUserWorkoutUseCase } from '@/infra/application/use-cases/workout-log/get-current-user-workout.use-case'
import { JsonResponse } from '@/infra/http/response/response.http'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const userId = await JwtStrategy.verifyToken()

    const workoutLogRepository = new PrismaWorkoutLogRepository(prisma)
    const currentUserWorkoutUseCase = new GetCurrentUserWorkoutUseCase(
      workoutLogRepository,
    )

    const userWorkoutLog = await currentUserWorkoutUseCase.handle(userId.id)

    if (userWorkoutLog.isLeft()) {
      const response = new JsonResponse(userWorkoutLog.value.message, 422)

      return response.send()
    }

    const hasWorkoutInProgress =
      await workoutLogRepository.checkHasCurrentWorkout(userId.id)

    if (!hasWorkoutInProgress) {
      const response = new JsonResponse(
        {
          active: false,
        },
        422,
      )

      return response.send()
    }

    return NextResponse.json({
      active: !!hasWorkoutInProgress,
      workoutTypeId: hasWorkoutInProgress.id,
    })
  } catch (e) {
    console.log(e)
    return new Response('', {
      status: 401,
      headers: {
        'content-type': 'application/json',
      },
    })
  }
}
