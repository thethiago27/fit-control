import {
  UserExerciseLog as UserExerciseLogRaw,
  WorkoutLog as WorkoutLogRaw,
} from '@prisma/client'
import { prisma } from '@/infra/database/prisma/prisma'

export class WorkoutLogRepository {
  static async create(
    userId: string,
    workoutListId: string,
  ): Promise<WorkoutLogRaw> {
    return prisma.workoutLog.create({
      data: {
        userId,
        workoutListId,
      },
    })
  }

  static async update(
    workoutLogId: string,
    data: Partial<WorkoutLogRaw>,
  ): Promise<WorkoutLogRaw> {
    return prisma.workoutLog.update({
      where: {
        id: workoutLogId,
      },
      data,
    })
  }

  static async checkHasCurrentWorkout(
    userId: string,
  ): Promise<WorkoutLogRaw | null> {
    return prisma.workoutLog.findFirst({
      where: {
        userId,
        completed: false,
      },
      cacheStrategy: { ttl: 60 },
    })
  }
}
