import { JsonResponse } from '@/infra/http/response/response.http'
import { StatusCode } from '@/infra/http/status-code'

export const runtime = 'edge'

export async function GET() {
  return new JsonResponse('Unauthorized', StatusCode.UNAUTHORIZED).send()
}
