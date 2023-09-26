import { DomainError } from '@/infra/core/domain/errors/DomainError'

export class CheckHasWorkoutInProgressError
  extends Error
  implements DomainError
{
  constructor() {
    super(`User has ready a workout in progress`)
    this.name = 'CheckHasWorkoutInProgressError'
  }
}
