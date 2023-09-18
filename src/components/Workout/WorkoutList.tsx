'use client'

import { useFetch } from '@/services/useFetcher'
import { WorkoutList as WorkoutListRaw } from '@prisma/client'
import { WorkoutBox } from '@/components/Workout/WorkoutBox'
import { Loading } from '@/components/Loading'

interface UserWorkoutCurrentResponse {
  workoutTypeId?: string
  workoutLogId?: string
  active: boolean
}

export function WorkoutList() {
  const { data: currentWorkout, isLoading } = useFetch<
    UserWorkoutCurrentResponse,
    any
  >(`/user-workout/current`)
  const { data } = useFetch<WorkoutListRaw[], any>(`/workout/list`)

  if (isLoading) {
    return <Loading />
  }

  return (
    <section className="flex flex-col gap-4">
      {data?.map((workout) => (
        <WorkoutBox
          key={workout.id}
          workout={workout}
          isActive={workout.id === currentWorkout?.workoutTypeId}
          workoutLogId={currentWorkout?.workoutLogId || ''}
        />
      ))}
    </section>
  )
}
