'use client'

import { useFetch } from '@/services/useFetcher'
import { WorkoutList as WorkoutListRaw } from '@prisma/client'
import { WorkoutBox } from '@/components/Workout/WorkoutBox'

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
    return (
      <div className="flex flex-col gap-4 bg-zinc-900 rounded-lg border border-transparent transition-colors border-gray-300 p-5">
        <div className="flex-1 w-100%">
          <div className="flex gap-4 text-emerald-500 font-bold">
            <h2>Carregando...</h2>
          </div>
        </div>
      </div>
    )
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
