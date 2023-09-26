import { PrismaExercisesRepository } from '@/infra/database/prisma/repositories/exercises.repository'
import { prisma } from '@/infra/database/prisma/prisma'
import { JsonResponse } from '@/infra/http/response/response.http'
import { StatusCode } from '@/infra/http/status-code'

export async function GET(
  request: Request,
  { params }: { params: { slug: string[] } },
) {
  try {
    const { slug } = params

    const exercises = new PrismaExercisesRepository(prisma)
    const exercisesById = await exercises.getByIds(slug)

    return new JsonResponse(exercisesById, StatusCode.OK).send()
  } catch (e) {
    return new JsonResponse(
      { error: 'Fail to get exercises' },
      StatusCode.INTERNAL_SERVER_ERROR,
    ).send()
  }
}
