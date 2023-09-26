import { AsyncMaybe } from '@/infra/core/logic/Maybe'
import { UserExerciseLog } from '@/infra/domain/entities/user-exercise.entity'

export abstract class UserExerciseLogRepository {
  abstract getExercisesByWorkoutLogId(
    workoutLogId: string,
  ): Promise<UserExerciseLog[]>

  abstract checkHasWorkoutInProgress(
    workoutLogId: string,
  ): AsyncMaybe<UserExerciseLog>

  abstract create(userExercise: UserExerciseLog): Promise<UserExerciseLog>

  abstract update(workout: UserExerciseLog): Promise<UserExerciseLog>

  abstract getExerciseById(id: string): AsyncMaybe<UserExerciseLog>
}
