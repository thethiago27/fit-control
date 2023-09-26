import { PrismaWorkoutListRepository } from '@/infra/database/prisma/repositories/workout-list.repository'
import { prisma } from '@/infra/database/prisma/prisma'
import { JsonResponse } from '@/infra/http/response/response.http'
export const fetchCache = 'auto'

export async function GET() {
  try {
    const workoutListRepository = new PrismaWorkoutListRepository(prisma)

    const workoutList = await workoutListRepository.getAll()

    const response = new JsonResponse(workoutList, 200)

    response.headers = {
      'Cache-Control': 's-maxage=10',
    }

    return response.send()
  } catch (e) {
    const response = new JsonResponse('', 500)

    return response.send()
  }
}
