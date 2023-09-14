import { prisma } from '@/infra/database/prisma/prisma'
import { User } from '@prisma/client'

export class PrismaUserRepository {
  static async create(user: User): Promise<User> {
    return await prisma.user.create({
      data: user,
    })
  }

  static async getByEmail(email: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: {
        email,
      },
    })
  }
}
