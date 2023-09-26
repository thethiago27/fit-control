import { DomainError } from '@/infra/core/domain/errors/DomainError'

export class CurrentUserWorkoutError extends Error implements DomainError {
  constructor() {
    super(`Current user has already a workout.`)
    this.name = 'CurrentUserWorkoutError'
  }
}
