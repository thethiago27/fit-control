import { PrismaWorkoutListRepository } from '@/infra/database/prisma/repositories/workout-list.repository'
import { PrismaExercisesRepository } from '@/infra/database/prisma/repositories/exercises.repository'

export async function GET(
  request: Request,
  { params }: { params: { slug: string } },
) {
  const { slug } = params

  const traine = await PrismaWorkoutListRepository.getById(slug)

  if (!traine) {
    return new Response(JSON.stringify({ error: 'Train not found' }), {
      status: 404,
    })
  }

  const exercises = await PrismaExercisesRepository.getById(traine.exercises)

  const data = {
    ...traine,
    exerciseList: exercises,
  }

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      'content-type': 'application/json',
      'cache-control': 'public, max-age=60, s-maxage=60',
    },
  })
}
