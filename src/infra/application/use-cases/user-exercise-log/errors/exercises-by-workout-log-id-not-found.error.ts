import { DomainError } from '@/infra/core/domain/errors/DomainError'

export class ExercisesByWorkoutLogIdNotFoundError
  extends Error
  implements DomainError
{
  constructor(id: string) {
    super(`Exercises by workout log id ${id} not found`)
    this.name = 'ExercisesByWorkoutLogIdNotFoundError'
  }
}
