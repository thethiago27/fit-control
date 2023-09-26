import { WorkoutLogRepository } from '@/infra/database/repositories/workout-log.repository'
import { Either, left, right } from '@/infra/core/logic/Either'
import { CurrentUserWorkoutError } from '@/infra/application/use-cases/workout-log/errors/current-user-workout.error'
import { WorkoutLog } from '@/infra/domain/entities/workout-log.entity'

type GetCurrentUserWorkout = Either<CurrentUserWorkoutError, WorkoutLog>

export class GetCurrentUserWorkoutUseCase {
  constructor(private readonly workoutLogRepository: WorkoutLogRepository) {}

  async handle(userId: string): Promise<GetCurrentUserWorkout> {
    const workoutLog =
      await this.workoutLogRepository.checkHasCurrentWorkout(userId)

    if (!workoutLog) {
      return left(new CurrentUserWorkoutError())
    }

    return right(workoutLog)
  }
}
