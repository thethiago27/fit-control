import { DomainError } from '@/infra/core/domain/errors/DomainError'

export class WorkoutListByIdNotFoundError extends Error implements DomainError {
  constructor(id: string) {
    super(`WorkoutList with id '${id}' was not found.`)
    this.name = 'WorkoutListNotFound'
  }
}
