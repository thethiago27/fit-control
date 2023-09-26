import { DomainResponse } from '@/infra/core/domain/response/DomainResponse'
export class JsonResponse<T> implements DomainResponse<T> {
  data: T
  headers: Record<string, string>
  statusCode: number

  constructor(data: T, statusCode = 200) {
    this.data = data
    this.statusCode = statusCode
    this.headers = {
      'Content-Type': 'application/json',
    }
  }

  public send(): Response {
    return new Response(JSON.stringify(this.data), {
      headers: this.headers,
      status: this.statusCode,
    })
  }
}
