import { Exercise as ExerciseRaw } from '@prisma/client'
import { prisma } from '@/infra/database/prisma/prisma'
import { Omit } from '@/infra/core/logic/Omit'

export class PrismaExercisesRepository {
  static async getAll(): Promise<ExerciseRaw[]> {
    return prisma.exercise.findMany()
  }

  static async getById(id: string[]): Promise<ExerciseRaw[]> {
    return prisma.exercise.findMany({
      where: {
        id: {
          in: id,
        },
      },
    })
  }

  static async create(
    data: Omit<ExerciseRaw, 'createdAt' | 'updatedAt' | 'id'>,
  ): Promise<ExerciseRaw> {
    return prisma.exercise.create({
      data,
    })
  }
}
