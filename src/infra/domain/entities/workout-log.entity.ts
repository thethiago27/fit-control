import { Entity } from '@/infra/core/domain/Entity'
import { Replace } from '@/infra/core/logic/Replace'

export type WorkoutLogProps = {
  workoutListId: string
  userId: string
}

export class WorkoutLog extends Entity<WorkoutLogProps> {
  get workoutListId(): string {
    return this.props.workoutListId
  }

  get userId(): string {
    return this.props.userId
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
