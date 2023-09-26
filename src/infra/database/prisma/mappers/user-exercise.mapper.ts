import { UserExerciseLog as RawUserExerciseLog, Prisma } from '@prisma/client'
import { UserExerciseLog } from '@/infra/domain/entities/user-exercise.entity'

export class UserExerciseMapper {
  static toDomain(raw: RawUserExerciseLog) {
    return UserExerciseLog.create(
      {
        exerciseId: raw.exerciseId,
        reps: raw.reps,
        sets: raw.sets,
        userId: raw.userId,
        workoutLogId: raw.workoutLogId,
        completed: raw.completed,
      },
      raw.id,
    )
  }

  static toPersistence(
    container: UserExerciseLog,
  ): Prisma.UserExerciseLogUncheckedCreateInput {
    return {
      exerciseId: container.exerciseId,
      reps: container.reps,
      sets: container.sets,
      userId: container.userId,
      workoutLogId: container.workoutLogId,
      completed: container.completed,
    }
  }
}
