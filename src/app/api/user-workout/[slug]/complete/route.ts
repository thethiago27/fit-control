import { PrismaUserExerciseLogRepository } from '@/infra/database/prisma/repositories/user-exercise-log.repository'
import { prisma } from '@/infra/database/prisma/prisma'
import { UserExerciseLog } from '@/infra/domain/entities/user-exercise.entity'
import { GetExercisesByIdUseCase } from '@/infra/application/use-cases/user-exercise-log/get-exercises-by-id.use-case'
import { JsonResponse } from '@/infra/http/response/response.http'
import { StatusCode } from '@/infra/http/status-code'

export async function POST(
  req: Request,
  { params }: { params: { slug: string } },
) {
  const { weight, performance } = await req.json()

  const { slug } = params

  const userExerciseLogRepository = new PrismaUserExerciseLogRepository(prisma)
  const userExerciseByIdUseCase = new GetExercisesByIdUseCase(
    userExerciseLogRepository,
  )

  const userExercise = await userExerciseByIdUseCase.handle(slug)

  if (userExercise.isLeft()) {
    return new JsonResponse(userExercise.value, StatusCode.NOT_FOUND)
  }

  const userWorkoutExercisesEntity = UserExerciseLog.create(
    {
      completed: true,
      sets: 4,
      reps: 10,
      workoutLogId: userExercise.value.workoutLogId,
      exerciseId: userExercise.value.exerciseId,
      userId: userExercise.value.userId,
      weight: Number(weight),
      performance,
    },
    slug,
  )

  const updateUserExercise = await userExerciseLogRepository.update(
    userWorkoutExercisesEntity,
  )

  // const checkHasMoreExercise =
  //   await UserExerciseLogRepository.checkHasWorkoutInProgress(
  //     userExerciseLogRepository.workoutLogId,
  //   )
  //
  // if (checkHasMoreExercise.length === 0) {
  //   await WorkoutLogRepository.update(userExerciseLogRepository.workoutLogId, {
  //     completed: true,
  //     endedAt: new Date(),
  //     updatedAt: new Date(),
  //   })
  // }
  //
  // return new Response('', {
  //   status: 201,
  // })
}
