import { WorkoutLog as RawWorkoutLog, Prisma } from '@prisma/client'
import { WorkoutLog } from '@/infra/domain/entities/workout-log.entity'

export class WorkoutLogMapper {
  static toDomain(raw: RawWorkoutLog): WorkoutLog {
    return WorkoutLog.create(
      {
        workoutListId: raw.workoutListId,
        userId: raw.userId,
        completed: raw.completed,
        endedAt: raw.endedAt as Date,
        createdAt: raw.createdAt,
      },
      raw.id,
    )
  }

  static toPersistence(
    container: WorkoutLog,
  ): Prisma.WorkoutLogUncheckedCreateInput {
    return {
      id: container.id,
      userId: container.userId,
      workoutListId: container.workoutListId,
      completed: container.completed,
      endedAt: container.endedAt,
    }
  }
}
