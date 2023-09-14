import { UserExerciseLogRepository } from '@/infra/database/prisma/repositories/user-exercise-log.repository'
import { WorkoutLogRepository } from '@/infra/database/prisma/repositories/workout-log.repository'

export async function POST(
  req: Request,
  { params }: { params: { slug: string } },
) {
  const { weight, performance } = await req.json()

  const { slug } = params

  const userExerciseLogRepository = await UserExerciseLogRepository.update(
    slug,
    {
      weight: Number(weight),
      performance,
      completed: true,
      updatedAt: new Date(),
    },
  )

  const checkHasMoreExercise =
    await UserExerciseLogRepository.checkHasWorkoutInProgress(
      userExerciseLogRepository.workoutLogId,
    )

  if (checkHasMoreExercise.length === 0) {
    await WorkoutLogRepository.update(userExerciseLogRepository.workoutLogId, {
      completed: true,
      endedAt: new Date(),
      updatedAt: new Date(),
    })
  }

  return new Response('', {
    status: 201,
  })
}
