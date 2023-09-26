import { Secret, sign, verify } from 'jsonwebtoken'
import { AuthUser } from '@/infra/http/auth/auth-user'
import { getToken } from '@/app/(auth)/action'

declare module 'jsonwebtoken' {
  export interface JwtPayload {
    id: string
  }
}
export class JwtStrategy {
  constructor(private readonly userId: string) {}

  generateToken(): string {
    return sign({ id: this.userId }, process.env.JWT_SECRET as Secret, {
      expiresIn: '7d',
    })
  }

  static async verifyToken(): Promise<AuthUser> {
    try {
      const token = await getToken()
      const { id } = verify(
        String(token),
        process.env.JWT_SECRET as Secret,
      ) as {
        id: string
      }
      return { id }
    } catch (e) {
      throw new Error('Invalid token')
    }
  }
}
