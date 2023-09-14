import { UserExerciseLogRepository } from '@/infra/database/prisma/repositories/user-exercise-log.repository'
import { PrismaExercisesRepository } from '@/infra/database/prisma/repositories/exercises.repository'

export async function GET(
  request: Request,
  { params }: { params: { slug: string } },
) {
  const { slug } = params
  const response = await UserExerciseLogRepository.getByWorkoutLogId(slug)

  const exercisesMap: Record<string, any> = {}

  const exercises = await PrismaExercisesRepository.getAll()
  exercises.forEach((exercise) => {
    exercisesMap[exercise.id] = exercise
  })

  const compiledResponse = response.map((item) => ({
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
