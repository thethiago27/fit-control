import { WorkoutList as WorkoutListRaw } from '@prisma/client'
import { prisma } from '@/infra/database/prisma/prisma'

export class PrismaWorkoutListRepository {
  static async getAll(): Promise<WorkoutListRaw[]> {
    return prisma.workoutList.findMany()
  }

  static async getByName(id: string): Promise<WorkoutListRaw | null> {
    return prisma.workoutList.findFirst({
      where: {
        name: id,
      },
    })
  }

  static async getById(id: string): Promise<WorkoutListRaw | null> {
    return prisma.workoutList.findUnique({
      where: {
        id,
      },
    })
  }

  static async create(data: any) {
    return prisma.workoutList.create({
      data,
    })
  }
}
