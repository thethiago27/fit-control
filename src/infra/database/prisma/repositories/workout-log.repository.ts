import { WorkoutLogRepository } from '@/infra/database/repositories/workout-log.repository'
import { AsyncMaybe } from '@/infra/core/logic/Maybe'
import { WorkoutLog } from '@/infra/domain/entities/workout-log.entity'
import { WorkoutLogMapper } from '@/infra/database/prisma/mappers/workout-log.mapper'
import { PrismaClient } from '@prisma/client'

export class PrismaWorkoutLogRepository extends WorkoutLogRepository {
  constructor(private readonly prisma: PrismaClient) {
    super()
  }

  async create(workoutLog: WorkoutLog): Promise<WorkoutLog> {
    await this.prisma.workoutLog.create({
      data: WorkoutLogMapper.toPersistence(workoutLog),
    })

    return workoutLog
  }

  async update(workout: WorkoutLog): Promise<WorkoutLog> {
    await this.prisma.workoutLog.update({
      where: {
        id: workout.id,
      },
      data: WorkoutLogMapper.toPersistence(workout),
    })

    return workout
  }

  async checkHasCurrentWorkout(userId: string): AsyncMaybe<WorkoutLog> {
    const workout = await this.prisma.workoutLog.findFirst({
      where: {
        userId,
        completed: false,
      },
    })

    if (!workout) return null

    return WorkoutLogMapper.toDomain(workout)
  }
}
