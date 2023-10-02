import { PrismaUserExerciseLogRepository } from '@/infra/database/prisma/repositories/user-exercise-log.repository'
import { prisma } from '@/infra/database/prisma/prisma'
import { UserExerciseLog } from '@/infra/domain/entities/user-exercise.entity'
import { GetExercisesByIdUseCase } from '@/infra/application/use-cases/user-exercise-log/get-exercises-by-id.use-case'
import { JsonResponse } from '@/infra/http/response/response.http'
import { StatusCode } from '@/infra/http/status-code'
import { PrismaWorkoutLogRepository } from '@/infra/database/prisma/repositories/workout-log.repository'
import { WorkoutLog } from '@/infra/domain/entities/workout-log.entity'
import { GetCurrentUserWorkoutUseCase } from '@/infra/application/use-cases/workout-log/get-current-user-workout.use-case'
import { CheckHasWorkoutInProgressUseCase } from '@/infra/application/use-cases/user-exercise-log/check-has-workout-in-progress.use-case'

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

  const workoutLogRepository = new PrismaWorkoutLogRepository(prisma)
  const workoutLogUseCase = new GetCurrentUserWorkoutUseCase(
    workoutLogRepository,
  )

  const workoutUserLog = await workoutLogUseCase.handle(
    userExercise.value.userId,
  )

  if (workoutUserLog.isLeft()) {
    return new JsonResponse(workoutUserLog.value, StatusCode.NOT_FOUND)
  }

  const workoutUserLogUseCase = new CheckHasWorkoutInProgressUseCase(
    userExerciseLogRepository,
  )

  const checkUserHasWorkoutInProgressUseCase =
    await workoutUserLogUseCase.handle(userExercise.value.userId)

  if (checkUserHasWorkoutInProgressUseCase.isRight()) {
    console.log('entrou aqui', updateUserExercise.workoutLogId)
    const workoutLog = WorkoutLog.create(
      {
        completed: true,
        createdAt: new Date(),
        userId: userExercise.value.userId,
        endedAt: new Date(),
        workoutListId: workoutUserLog.value.workoutListId,
      },
      updateUserExercise.workoutLogId,
    )

    await workoutLogRepository.update(workoutLog)
  }

  return new JsonResponse('', StatusCode.NO_CONTENT).send()
}
