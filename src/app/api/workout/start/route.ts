import { prisma } from '@/infra/database/prisma/prisma'
import { PrismaWorkoutListRepository } from '@/infra/database/prisma/repositories/workout-list.repository'
import { PrismaExercisesRepository } from '@/infra/database/prisma/repositories/exercises.repository'
import { WorkoutLogRepository } from '@/infra/database/prisma/repositories/workout-log.repository'
import { JwtStrategy } from '@/infra/http/auth/jwt.strategy'

export async function POST(req: Request) {
  const { workoutListId } = await req.json()

  const userId = await JwtStrategy.verifyToken()

  const traine = await PrismaWorkoutListRepository.getById(workoutListId)

  if (!traine) {
    return new Response(JSON.stringify({ error: 'Train not found' }), {
      status: 404,
    })
  }

  const exercises = await PrismaExercisesRepository.getById(traine.exercises)

  const hasWorkoutInProgress =
    await WorkoutLogRepository.checkHasCurrentWorkout(String(userId.id))

  if (hasWorkoutInProgress) {
    return new Response(
      JSON.stringify({ error: 'Workout already in progress' }),
      {
        status: 400,
      },
    )
  }

  const workoutLog = await WorkoutLogRepository.create(
    String(userId.id),
    workoutListId,
  )

  for await (const exercise of exercises) {
    await prisma.userExerciseLog.create({
      data: {
        workoutLogId: workoutLog.id,
        exerciseId: exercise.id,
        userId: String(userId.id),
        reps: exercise.reps,
        sets: exercise.sets,
      },
    })
  }

  return new Response(JSON.stringify({ workoutLogId: workoutLog.id }), {
    status: 200,
  })
}
