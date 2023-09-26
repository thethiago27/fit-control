import { Exercise as RawExercise, Prisma } from '@prisma/client'
import { Exercise } from '@/infra/domain/entities/exercise.entity'

export class ExerciseMapper {
  static toDomain(raw: RawExercise): Exercise {
    return Exercise.create(
      {
        name: raw.name,
        sets: raw.sets,
        reps: raw.reps,
        workoutTypeId: raw.workoutTypeId,
        slug: raw.slug,
      },
      raw.id,
    )
  }

  static toPersistence(
    container: Exercise,
  ): Prisma.ExerciseUncheckedCreateInput {
    return {
      id: container.id,
      name: container.name,
      sets: container.sets,
      reps: container.reps,
      workoutTypeId: container.workoutTypeId,
      slug: container.slug,
    }
  }
}
