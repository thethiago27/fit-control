import { PrismaExercisesRepository } from '@/infra/database/prisma/repositories/exercises.repository'
import { prisma } from '@/infra/database/prisma/prisma'
import { JsonResponse } from '@/infra/http/response/response.http'
import { StatusCode } from '@/infra/http/status-code'

export async function GET() {
  try {
    const exercisesRepository = new PrismaExercisesRepository(prisma)
    const exercises = await exercisesRepository.getAll()

    return new JsonResponse(exercises, StatusCode.OK).send()
  } catch (e) {
    return new JsonResponse(
      { error: 'Fail to get exercises' },
      StatusCode.INTERNAL_SERVER_ERROR,
    ).send()
  }
}
