import { PrismaClient } from '@prisma/client'
import { ExerciseRepository } from '@/infra/database/repositories/exercise.repository'
import { Exercise } from '@/infra/domain/entities/exercise.entity'
import { ExerciseMapper } from '@/infra/database/prisma/mappers/exercise.mapper'

export class PrismaExercisesRepository extends ExerciseRepository {
  constructor(private readonly prisma: PrismaClient) {
    super()
  }

  async getAll(): Promise<Exercise[]> {
    const exercises = await this.prisma.exercise.findMany()

    return exercises.map((exercise) => ExerciseMapper.toDomain(exercise))
  }

  async getByIds(id: string[]): Promise<Exercise[]> {
    const exercises = await this.prisma.exercise.findMany({
      where: {
        id: {
          in: id,
        },
      },
    })

    return exercises.map((exercise) => ExerciseMapper.toDomain(exercise))
  }
}
