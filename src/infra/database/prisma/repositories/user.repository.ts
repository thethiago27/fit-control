import { prisma } from '@/infra/database/prisma/prisma'
import { UserRepository } from '@/infra/database/repositories/user.repository'
import { PrismaClient } from '@prisma/client/edge'
import { UserEntity } from '@/infra/domain/entities/user.entity'
import { UserMapper } from '@/infra/database/prisma/mappers/user.mapper'
import { AsyncMaybe } from '@/infra/core/logic/Maybe'

export class PrismaUserRepository extends UserRepository {
  constructor(private readonly prisma: PrismaClient) {
    super()
  }

  async create(user: UserEntity): Promise<UserEntity> {
    await this.prisma.user.create({
      data: UserMapper.toPersistence(user),
    })

    return user
  }

  async getByEmail(email: string): AsyncMaybe<UserEntity> {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (!user) {
      return null
    }

    return UserMapper.toDomain(user)
  }
}
