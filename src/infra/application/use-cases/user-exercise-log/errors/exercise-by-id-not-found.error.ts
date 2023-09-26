import { DomainError } from '@/infra/core/domain/errors/DomainError'

export class ExerciseByIdNotFoundError extends Error implements DomainError {
  constructor(id: string) {
    super(`Exercise by id ${id} not found`)
    this.name = 'ExerciseByIdNotFoundError'
  }
}
