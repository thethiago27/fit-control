import { Entity } from '@/infra/core/domain/Entity'
import { Replace } from '@/infra/core/logic/Replace'

export type UserProps = {
  email: string
  name: string
  uid: string
  photoUrl: string
  emailVerified: boolean
}

export class UserEntity extends Entity<UserProps> {
  get email() {
    return this.props.email
  }

  get name() {
    return this.props.name
  }

  get uid() {
    return this.props.uid
  }

  get photoUrl() {
    return this.props.photoUrl
  }

  get emailVerified() {
    return this.props.emailVerified
  }

  static create(
    props: Replace<
      UserProps,
      {
        createdAt?: Date
      }
    >,
    id?: string,
  ) {
    return new UserEntity(
      {
        ...props,
      },
      id,
    )
  }
}
