import { PrismaUserExerciseLogRepository } from '@/infra/database/prisma/repositories/user-exercise-log.repository'
import { PrismaExercisesRepository } from '@/infra/database/prisma/repositories/exercises.repository'
import { prisma } from '@/infra/database/prisma/prisma'
import { GetExercisesByWorkoutLogIdUseCase } from '@/infra/application/use-cases/user-exercise-log/get-exercises-by-workout-log-id.use-case'
import { JsonResponse } from '@/infra/http/response/response.http'
import { StatusCode } from '@/infra/http/status-code'

export async function GET(
  request: Request,
  { params }: { params: { slug: string } },
) {
  const { slug } = params

  const userExerciseLogRepository = new PrismaUserExerciseLogRepository(prisma)

  const checkUserExerciseLogUseCase = new GetExercisesByWorkoutLogIdUseCase(
    userExerciseLogRepository,
  )

  const userExerciseLogUseCase = await checkUserExerciseLogUseCase.handle(slug)

  if (userExerciseLogUseCase.isLeft()) {
    return new JsonResponse(userExerciseLogUseCase.value, StatusCode.OK).send()
  }

  const exercisesRepository = new PrismaExercisesRepository(prisma)

  const exercises = await exercisesRepository.getByIds(
    userExerciseLogUseCase.value.map((item) => item.exerciseId),
  )

  const exercisesMap: Record<string, any> = {}

  exercises.forEach((exercise) => {
    exercisesMap[exercise.id] = exercise
  })

  const compiledResponse = userExerciseLogUseCase.value.map((item) => ({
    ...item,
    exercise: exercisesMap[item.exerciseId],
  }))

  return new Response(JSON.stringify(compiledResponse), {
    status: 200,
    headers: {
      'content-type': 'application/json',
    },
  })
}
