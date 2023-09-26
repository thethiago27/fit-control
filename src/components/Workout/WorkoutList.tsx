'use client'

import { useFetch } from '@/services/useFetcher'
import { WorkoutList as WorkoutListRaw } from '@prisma/client'
import { WorkoutBox } from '@/components/Workout/WorkoutBox'
import { Loading } from '@/components/Loading'

interface UserWorkoutCurrentResponse {
  workoutListId?: string
  workoutLogId?: string
  active: boolean
}

interface WorkoutListProps {
  _id: string
  props: WorkoutListRaw
}

export function WorkoutList() {
  const { data: currentWorkout, isLoading } = useFetch<
    UserWorkoutCurrentResponse,
    any
  >(`/user-workout/current`)
  const { data } = useFetch<WorkoutListProps[], any>(`/workout/list`)

  if (isLoading) {
    return <Loading />
  }

  return (
    <section className="flex flex-col gap-4">
      {data?.map((workout) => (
        <WorkoutBox
          key={workout._id}
          workout={workout}
          isActive={workout._id === currentWorkout?.workoutListId}
          workoutLogId={currentWorkout?.workoutLogId || ''}
        />
      ))}
    </section>
  )
}
