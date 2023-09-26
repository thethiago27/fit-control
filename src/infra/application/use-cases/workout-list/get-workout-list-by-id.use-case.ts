import { WorkoutListByIdNotFoundError } from './errors/workout-list-by-id-not-found.error'
import { WorkoutList } from '@/infra/domain/entities/workout-list.entity'
import { Either, left, right } from '@/infra/core/logic/Either'
import { WorkoutListRepository } from '@/infra/database/repositories/workout-list.repository'

type GetWorkoutListById = Either<WorkoutListByIdNotFoundError, WorkoutList>

export class GetWorkoutListByIdUseCase {
  constructor(private readonly workoutListRepository: WorkoutListRepository) {}

  async handle(id: string): Promise<GetWorkoutListById> {
    const workoutList = await this.workoutListRepository.getById(id)

    if (!workoutList) {
      return left(new WorkoutListByIdNotFoundError(id))
    }

    return right(workoutList)
  }
}
