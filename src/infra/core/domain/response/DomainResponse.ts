export interface DomainResponse<T> {
  data: T
  headers: Record<string, string>
  statusCode: number
}
