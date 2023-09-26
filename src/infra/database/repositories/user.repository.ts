import { UserEntity } from '@/infra/domain/entities/user.entity'
import { AsyncMaybe } from '@/infra/core/logic/Maybe'

export abstract class UserRepository {
  abstract create(user: UserEntity): Promise<UserEntity>
  abstract getByEmail(email: string): AsyncMaybe<UserEntity>
}
