import { Prisma, User as RawUser } from '@prisma/client'
import { UserEntity } from '@/infra/domain/entities/user.entity'

export class UserMapper {
  static toDomain(raw: RawUser): UserEntity {
    return UserEntity.create(
      {
        name: raw.name,
        email: raw.email,
        uid: raw.uid,
        photoUrl: raw.photoUrl || '',
        emailVerified: raw.emailVerified,
      },
      raw.id,
    )
  }

  static toPersistence(container: UserEntity): Prisma.UserCreateInput {
    return {
      id: container.id,
      name: container.name,
      email: container.email,
      uid: container.uid,
      photoUrl: container.photoUrl,
      emailVerified: container.emailVerified,
    }
  }
}
