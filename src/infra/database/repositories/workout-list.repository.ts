import { AsyncMaybe } from '@/infra/core/logic/Maybe'
import { WorkoutList } from '@/infra/domain/entities/workout-list.entity'

export abstract class WorkoutListRepository {
  abstract getAll(): Promise<WorkoutList[]>
  abstract getById(id: string): AsyncMaybe<WorkoutList>
}
