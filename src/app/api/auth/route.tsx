import { PrismaUserRepository } from '@/infra/database/prisma/repositories/user.repository'
import { prisma } from '@/infra/database/prisma/prisma'
import { GetUserByEmailUseCase } from '@/infra/application/use-cases/user/get-user-by-email.use-case'
import { UserEntity } from '@/infra/domain/entities/user.entity'
import { JsonResponse } from '@/infra/http/response/response.http'
import { createToken } from '@/app/(auth)/action'
import { JwtStrategy } from '@/infra/http/auth/jwt.strategy'
import { StatusCode } from '@/infra/http/status-code'

type Response = {
  token: string
}

export async function POST(req: Request) {
  try {
    const { uid, email, name, photoUrl } = await req.json()

    if (!email || !name || !photoUrl) {
      throw new Error('Missing required fields')
    }

    const userRepository = new PrismaUserRepository(prisma)

    const getUserByEmailUseCase = new GetUserByEmailUseCase(userRepository)

    const existingUserByEmail = await getUserByEmailUseCase.handle(email)

    let userId: string

    if (existingUserByEmail.isLeft()) {
      const user = new UserEntity({
        email,
        name,
        photoUrl,
        uid,
        emailVerified: true,
      })

      await userRepository.create(user)

      userId = user.id
    } else {
      userId = existingUserByEmail.value.id
    }

    const jwt = new JwtStrategy(userId).generateToken()

    await createToken(jwt)

    return new JsonResponse('', StatusCode.OK).send()
  } catch (error: any) {
    return new JsonResponse(error.message, 400).send()
  }
}
