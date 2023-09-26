import { PrismaClient } from '@prisma/client/edge'
import { WorkoutListRepository } from '@/infra/database/repositories/workout-list.repository'
import { WorkoutListMapper } from '@/infra/database/prisma/mappers/workout-list.mapper'
import { WorkoutList } from '@/infra/domain/entities/workout-list.entity'
import { AsyncMaybe } from '@/infra/core/logic/Maybe'

export class PrismaWorkoutListRepository extends WorkoutListRepository {
  constructor(private readonly prisma: PrismaClient) {
    super()
  }

  async getAll(): Promise<WorkoutList[]> {
    const workoutList = await this.prisma.workoutList.findMany()

    return workoutList.map(WorkoutListMapper.toDomain)
  }

  async getById(id: string): AsyncMaybe<WorkoutList> {
    const workoutList = await this.prisma.workoutList.findUnique({
      where: {
        id,
      },
    })

    if (!workoutList) {
      return null
    }

    return WorkoutListMapper.toDomain(workoutList)
  }
}
