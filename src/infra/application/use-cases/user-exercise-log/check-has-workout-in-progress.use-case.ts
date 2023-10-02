import { CheckHasWorkoutInProgressError } from '@/infra/application/use-cases/user-exercise-log/errors/check-has-workout-in-progress.error'
import { UserExerciseLog } from '@/infra/domain/entities/user-exercise.entity'
import { Either, left, right } from '@/infra/core/logic/Either'
import { UserExerciseLogRepository } from '@/infra/database/repositories/user-exercise-log.repository'

type CheckHasWorkoutInProgress = Either<
  UserExerciseLog,
  CheckHasWorkoutInProgressError
>

export class CheckHasWorkoutInProgressUseCase {
  constructor(
    private readonly userExerciseLogRepository: UserExerciseLogRepository,
  ) {}

  async handle(id: string): Promise<CheckHasWorkoutInProgress> {
    const workout =
      await this.userExerciseLogRepository.checkHasWorkoutInProgress(id)

    if (workout) {
      return left(workout)
    }

    return right(new CheckHasWorkoutInProgressError())
  }
}
