import { WorkoutLog } from '@/infra/domain/entities/workout-log.entity'
import { AsyncMaybe } from '@/infra/core/logic/Maybe'

export abstract class WorkoutLogRepository {
  abstract checkHasCurrentWorkout(userId: string): AsyncMaybe<WorkoutLog>
  abstract create(workoutLog: WorkoutLog): Promise<WorkoutLog>
  abstract update(workoutLog: WorkoutLog): Promise<WorkoutLog>
}
