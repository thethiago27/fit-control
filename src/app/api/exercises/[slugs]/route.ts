import { PrismaExercisesRepository } from '@/infra/database/prisma/repositories/exercises.repository'

export async function GET(
  request: Request,
  { params }: { params: { slug: string[] } },
) {
  const { slug } = params

  const exercises = await PrismaExercisesRepository.getById(slug)

  return new Response(JSON.stringify(exercises), {
    status: 200,
    headers: {
      'content-type': 'application/json',
    },
  })
}
