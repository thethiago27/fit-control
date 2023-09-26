import { UserRepository } from '@/infra/database/repositories/user.repository'
import { Either, left, right } from '@/infra/core/logic/Either'
import { UserEntity } from '@/infra/domain/entities/user.entity'
import { UserByEmailNotFoundError } from '@/infra/application/use-cases/user/errors/user-by-email-not-found.error'

type GetUserByEmail = Either<UserByEmailNotFoundError, UserEntity>

export class GetUserByEmailUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async handle(email: string): Promise<GetUserByEmail> {
    const user = await this.userRepository.getByEmail(email)

    if (!user) {
      return left(new UserByEmailNotFoundError(email))
    }

    return right(user)
  }
}
