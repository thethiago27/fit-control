import { Entity } from '@/infra/core/domain/Entity'
import { Replace } from '@/infra/core/logic/Replace'

export type WorkoutListProps = {
  name: string
  exercises: string[]
  createdAt: Date
  updatedAt: Date
}

export class WorkoutList extends Entity<WorkoutListProps> {
  get name() {
    return this.props.name
  }

  get exercises() {
    return this.props.exercises
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  static create(
    props: Replace<
      WorkoutListProps,
      {
        createdAt?: Date
      }
    >,
    id?: string,
  ) {
    return new WorkoutList(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
        updatedAt: new Date(),
      },
      id,
    )
  }
}
