import { Exercise } from '@/infra/domain/entities/exercise.entity'

export abstract class ExerciseRepository {
  abstract getByIds(id: string[]): Promise<Exercise[]>
  abstract getAll(): Promise<Exercise[]>
}
