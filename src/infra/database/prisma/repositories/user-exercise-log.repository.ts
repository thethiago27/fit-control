import { prisma } from '@/infra/database/prisma/prisma'
import { PrismaClient } from '@prisma/client/edge'
import { AsyncMaybe } from '@/infra/core/logic/Maybe'
import { UserExerciseLog } from '@/infra/domain/entities/user-exercise.entity'
import { UserExerciseMapper } from '@/infra/database/prisma/mappers/user-exercise.mapper'
import { UserExerciseLogRepository } from '@/infra/database/repositories/user-exercise-log.repository'

export class PrismaUserExerciseLogRepository extends UserExerciseLogRepository {
  constructor(private readonly prisma: PrismaClient) {
    super()
  }

  async getExercisesByWorkoutLogId(
    workoutLogId: string,
  ): Promise<UserExerciseLog[]> {
    const userExercise = await this.prisma.userExerciseLog.findMany({
      where: {
        workoutLogId,
      },
    })

    return userExercise.map((exercise) => UserExerciseMapper.toDomain(exercise))
  }

  async getExerciseById(id: string): AsyncMaybe<UserExerciseLog> {
    const userExercise = await this.prisma.userExerciseLog.findUnique({
      where: {
        id,
      },
    })

    if (!userExercise) {
      return null
    }

    return UserExerciseMapper.toDomain(userExercise)
  }

  async create(userExercise: UserExerciseLog): Promise<UserExerciseLog> {
    await this.prisma.userExerciseLog.create({
      data: UserExerciseMapper.toPersistence(userExercise),
    })

    return userExercise
  }

  async checkHasWorkoutInProgress(
    workoutLogId: string,
  ): AsyncMaybe<UserExerciseLog> {
    const workout = await this.prisma.userExerciseLog.findFirst({
      where: {
        workoutLogId,
        completed: false,
      },
    })

    if (!workout) {
      return null
    }

    return UserExerciseMapper.toDomain(workout)
  }

  async update(userExercise: UserExerciseLog): Promise<UserExerciseLog> {
    await prisma.userExerciseLog.update({
      where: {
        id: userExercise.id,
      },
      data: UserExerciseMapper.toPersistence(userExercise),
    })

    return userExercise
  }
}
