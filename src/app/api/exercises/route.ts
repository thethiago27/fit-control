import { PrismaExercisesRepository } from '@/infra/database/prisma/repositories/exercises.repository'

export async function GET() {
  try {
    const exercise = await PrismaExercisesRepository.getAll()

    return new Response(JSON.stringify(exercise), {
      headers: {
        'content-type': 'application/json;charset=UTF-8',
      },
    })
  } catch (e) {
    return new Response(JSON.stringify({ error: 'Erro ao obter' }), {
      status: 500,
    })
  }
}
