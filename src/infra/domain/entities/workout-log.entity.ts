import { Entity } from '@/infra/core/domain/Entity'
import { Replace } from '@/infra/core/logic/Replace'

export type WorkoutLogProps = {
  workoutListId: string
  userId: string
  completed: boolean
  endedAt: Date
}

export class WorkoutLog extends Entity<WorkoutLogProps> {
  get workoutListId(): string {
    return this.props.workoutListId
  }

  get userId(): string {
    return this.props.userId
  }

  get completed(): boolean {
    return this.props.completed
  }

  get endedAt(): Date {
    return this.props.endedAt
  }

  static create(
    props: Replace<
      WorkoutLogProps,
      {
        createdAt?: Date
      }
    >,
    id?: string,
  ) {
    return new WorkoutLog(
      {
        ...props,
      },
      id,
    )
  }
}
