import { PrismaExercisesRepository } from '@/infra/database/prisma/repositories/exercises.repository'

export async function GET() {
  const exercise = await PrismaExercisesRepository.getAll()

  return new Response(JSON.stringify(exercise), {
    headers: {
      'content-type': 'application/json;charset=UTF-8',
    },
  })
}
