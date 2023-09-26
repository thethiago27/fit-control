import { prisma } from '@/infra/database/prisma/prisma'
import { PrismaWorkoutListRepository } from '@/infra/database/prisma/repositories/workout-list.repository'
import { PrismaWorkoutLogRepository } from '@/infra/database/prisma/repositories/workout-log.repository'
import { JwtStrategy } from '@/infra/http/auth/jwt.strategy'
import { GetWorkoutListByIdUseCase } from '@/infra/application/use-cases/workout-list/get-workout-list-by-id.use-case'
import { GetCurrentUserWorkoutUseCase } from '@/infra/application/use-cases/workout-log/get-current-user-workout.use-case'
import { JsonResponse } from '@/infra/http/response/response.http'
import { StatusCode } from '@/infra/http/status-code'
import { WorkoutLog } from '@/infra/domain/entities/workout-log.entity'
import { PrismaExercisesRepository } from '@/infra/database/prisma/repositories/exercises.repository'
import { PrismaUserExerciseLogRepository } from '@/infra/database/prisma/repositories/user-exercise-log.repository'
import { UserExerciseLog } from '@/infra/domain/entities/user-exercise.entity'

export async function POST(req: Request) {
  const { workoutListId } = await req.json()

  const userId = await JwtStrategy.verifyToken()

  const workoutListRepository = new PrismaWorkoutListRepository(prisma)

  const getWorkoutListByIdUseCase = new GetWorkoutListByIdUseCase(
    workoutListRepository,
  )

  const workoutList = await getWorkoutListByIdUseCase.handle(workoutListId)

  if (workoutList.isLeft()) {
    return new JsonResponse(workoutList.value, StatusCode.NOT_FOUND).send()
  }

  const workoutLogRepository = new PrismaWorkoutLogRepository(prisma)

  const checkHasWorkoutInProgressUseCase = new GetCurrentUserWorkoutUseCase(
    workoutLogRepository,
  )

  const checkUserHasWorkoutInProgressUseCase =
    await checkHasWorkoutInProgressUseCase.handle(userId.id)

  if (checkUserHasWorkoutInProgressUseCase.isLeft()) {
    return new JsonResponse(
      checkUserHasWorkoutInProgressUseCase.value,
      StatusCode.USER_INPUT_ERROR,
    ).send()
  }

  const workout = WorkoutLog.create({
    workoutListId,
    userId: userId.id,
    createdAt: new Date(),
  })

  const workoutLog = await workoutLogRepository.create(workout)

  const exercisesRepository = new PrismaExercisesRepository(prisma)
  const exercises = await exercisesRepository.getByIds(
    workoutList.value.exercises,
  )

  const userExerciseRepository = new PrismaUserExerciseLogRepository(prisma)

  for await (const exercise of exercises) {
    const userExercise = UserExerciseLog.create({
      workoutLogId: workoutLog.id,
      exerciseId: exercise.id,
      userId: String(userId.id),
      reps: exercise.reps,
      sets: exercise.sets,
      completed: false,
    })

    await userExerciseRepository.create(userExercise)
  }

  return new JsonResponse({ workoutLogId: workoutLog.id }, StatusCode.OK).send()
}
