import { PrismaUserRepository } from '@/infra/database/prisma/repositories/user.repository'
import { v4 as uuid } from 'uuid'
import { JwtStrategy } from '@/infra/http/auth/jwt.strategy'

export async function POST(req: Request) {
  const { uid, email, name, photoUrl } = await req.json()

  const existingUser = await PrismaUserRepository.getByEmail(email)

  const userId = existingUser?.id || uuid()

  if (!existingUser) {
    await PrismaUserRepository.create({
      uid,
      email,
      name,
      photoUrl,
      emailVerified: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      id: userId,
    })
  }

  console.log('userId', userId)

  const token = JwtStrategy.generateToken(userId)

  return new Response(JSON.stringify({ token }), {
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
