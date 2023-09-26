import { Entity } from '@/infra/core/domain/Entity'
import { Replace } from '@/infra/core/logic/Replace'

export type ExerciseProps = {
  name: string
  sets: number
  reps: number
  workoutTypeId: string
  slug: string
}

export class Exercise extends Entity<ExerciseProps> {
  get name() {
    return this.props.name
  }

  get sets() {
    return this.props.sets
  }

  get reps() {
    return this.props.reps
  }

  get workoutTypeId() {
    return this.props.workoutTypeId
  }

  get slug() {
    return this.props.slug
  }

  static create(
    props: Replace<
      ExerciseProps,
      {
        createdAt?: Date
      }
    >,
    id?: string,
  ) {
    return new Exercise(
      {
        ...props,
      },
      id,
    )
  }
}
