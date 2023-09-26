import { Entity } from '@/infra/core/domain/Entity'
import { Replace } from '@/infra/core/logic/Replace'

export type UserExercisesProps = {
  workoutLogId: string
  exerciseId: string
  userId: string
  reps: number
  sets: number
  completed: boolean
  weight?: number
  performance?: string
}

export class UserExerciseLog extends Entity<UserExercisesProps> {
  get workoutLogId(): string {
    return this.props.workoutLogId
  }

  get exerciseId(): string {
    return this.props.exerciseId
  }

  get userId(): string {
    return this.props.userId
  }

  get reps(): number {
    return this.props.reps
  }

  get sets(): number {
    return this.props.sets
  }

  get completed(): boolean {
    return this.props.completed
  }

  static create(
    props: Replace<
      UserExercisesProps,
      {
        createdAt?: Date
      }
    >,
    id?: string,
  ) {
    return new UserExerciseLog(
      {
        ...props,
      },
      id,
    )
  }
}
