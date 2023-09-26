import { PrismaWorkoutListRepository } from '@/infra/database/prisma/repositories/workout-list.repository'
import { PrismaExercisesRepository } from '@/infra/database/prisma/repositories/exercises.repository'
import { prisma } from '@/infra/database/prisma/prisma'
import { GetWorkoutListByIdUseCase } from '@/infra/application/use-cases/workout-list/get-workout-list-by-id.use-case'
import { JsonResponse } from '@/infra/http/response/response.http'

export async function GET(
  request: Request,
  { params }: { params: { slug: string } },
) {
  const { slug } = params

  const workoutListRepository = new PrismaWorkoutListRepository(prisma)
  const getWorkoutListByIdUseCase = new GetWorkoutListByIdUseCase(
    workoutListRepository,
  )

  const workoutList = await getWorkoutListByIdUseCase.handle(slug)

  if (workoutList.isLeft()) {
    return new Response(JSON.stringify(workoutList.value), {
      status: 404,
    })
  }

  const exercisesRepository = new PrismaExercisesRepository(prisma)
  const exercises = await exercisesRepository.getByIds(
    workoutList.value.exercises,
  )

  const data = {
    ...workoutList.value,
    exerciseList: exercises,
  }

  const response = new JsonResponse(data, 200)

  response.headers = {
    'Cache-Control': 's-maxage=10',
  }

  return response.send()
}
