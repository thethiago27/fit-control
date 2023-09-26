import { PrismaWorkoutLogRepository } from '@/infra/database/prisma/repositories/workout-log.repository'
import { JwtStrategy } from '@/infra/http/auth/jwt.strategy'
import { prisma } from '@/infra/database/prisma/prisma'
import { JsonResponse } from '@/infra/http/response/response.http'

const HTTP_STATUS = {
  OK: 200,
  UNAUTHORIZED: 401,
  INTERNAL_SERVER_ERROR: 500,
}

export async function GET() {
  try {
    const userId = await JwtStrategy.verifyToken()
    const workoutLogRepository = new PrismaWorkoutLogRepository(prisma)
    const hasWorkoutInProgress =
      await workoutLogRepository.checkHasCurrentWorkout(userId.id)

    if (!hasWorkoutInProgress) {
      return new JsonResponse({ active: false }, HTTP_STATUS.OK).send()
    }

    return new JsonResponse({
      active: true,
      workoutListId: hasWorkoutInProgress.workoutListId,
      workoutLogId: hasWorkoutInProgress.id,
    }).send()
  } catch (error: any) {
    if (error.name === 'TokenExpiredError') {
      return new JsonResponse(
        { message: 'Token expired' },
        HTTP_STATUS.UNAUTHORIZED,
      ).send()
    }

    return new JsonResponse(
      'Error on server',
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
    ).send()
  }
}
