import { Either, left, right } from '@/infra/core/logic/Either'
import { ExerciseByIdNotFoundError } from '@/infra/application/use-cases/user-exercise-log/errors/exercise-by-id-not-found.error'
import { UserExerciseLog } from '@/infra/domain/entities/user-exercise.entity'
import { UserExerciseLogRepository } from '@/infra/database/repositories/user-exercise-log.repository'

type GetExercisesById = Either<ExerciseByIdNotFoundError, UserExerciseLog>

export class GetExercisesByIdUseCase {
  constructor(
    private readonly userExerciseLogRepository: UserExerciseLogRepository,
  ) {}

  async handle(id: string): Promise<GetExercisesById> {
    const exercise = await this.userExerciseLogRepository.getExerciseById(id)

    if (!exercise) {
      return left(new ExerciseByIdNotFoundError(id))
    }

    return right(exercise)
  }
}
