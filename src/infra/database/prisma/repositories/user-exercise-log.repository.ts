import { prisma } from '@/infra/database/prisma/prisma'
import { UserExerciseLog as UserExerciseLogRaw } from '@prisma/client'

export class UserExerciseLogRepository {
  static async getByWorkoutLogId(
    workoutLogId: string,
  ): Promise<UserExerciseLogRaw[]> {
    return await prisma.userExerciseLog.findMany({
      where: {
        workoutLogId,
      },
      cacheStrategy: { ttl: 60 },
    })
  }

  static async checkHasWorkoutInProgress(
    workoutLogId: string,
  ): Promise<UserExerciseLogRaw[]> {
    return await prisma.userExerciseLog.findMany({
      where: {
        workoutLogId,
        completed: {
          equals: false,
        },
      },
      cacheStrategy: { ttl: 60 },
    })
  }

  static async update(
    id: string,
    data: Partial<UserExerciseLogRaw>,
  ): Promise<UserExerciseLogRaw> {
    return await prisma.userExerciseLog.update({
      where: {
        id,
      },
      data: {
        ...data,
      },
    })
  }
}
