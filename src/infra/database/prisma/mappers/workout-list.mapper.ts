import { WorkoutList as RawWorkoutList, Prisma } from '@prisma/client'
import { WorkoutList } from '@/infra/domain/entities/workout-list.entity'

export class WorkoutListMapper {
  static toDomain(raw: RawWorkoutList): WorkoutList {
    return WorkoutList.create(
      {
        name: raw.name,
        exercises: raw.exercises,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      raw.id,
    )
  }

  static toPersistence(container: WorkoutList): Prisma.WorkoutListCreateInput {
    return {
      id: container.id,
      name: container.name,
      exercises: container.exercises,
    }
  }
}
