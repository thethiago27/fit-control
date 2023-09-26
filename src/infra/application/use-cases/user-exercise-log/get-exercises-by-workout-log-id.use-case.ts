import { Either, left, right } from '@/infra/core/logic/Either'
import { ExercisesByWorkoutLogIdNotFoundError } from '@/infra/application/use-cases/user-exercise-log/errors/exercises-by-workout-log-id-not-found.error'
import { UserExerciseLog } from '@/infra/domain/entities/user-exercise.entity'
import { UserExerciseLogRepository } from '@/infra/database/repositories/user-exercise-log.repository'

type GetExercisesByWorkoutLogId = Either<
  ExercisesByWorkoutLogIdNotFoundError,
  UserExerciseLog[]
>

export class GetExercisesByWorkoutLogIdUseCase {
  constructor(
    private readonly userExerciseLogRepository: UserExerciseLogRepository,
  ) {}

  async handle(id: string): Promise<GetExercisesByWorkoutLogId> {
    const exercises =
      await this.userExerciseLogRepository.getExercisesByWorkoutLogId(id)

    if (!exercises) {
      return left(new ExercisesByWorkoutLogIdNotFoundError(id))
    }

    return right(exercises)
  }
}
