'use client'

import { Exercise as ExerciseRaw } from '@prisma/client'
import { useParams } from 'next/navigation'
import { CheckCircle } from '@phosphor-icons/react'
import { useFetch } from '@/services/useFetcher'
import { ExerciseForm } from '@/components/ExerciseForm'
import { Loading } from '@/components/Loading'

interface WorkoutLogEntry {
  _id: string
  props: {
    exerciseId: string
    reps: number
    sets: number
    userId: string
    workoutLogId: string
    completed: boolean
  }
  exercise: {
    _id: string
    props: ExerciseRaw
  }
}

export function ExercisesList() {
  const { slug } = useParams()

  const MUTATION_URL = `/user-workout/${slug}/exercises`

  const { data, isLoading } = useFetch<WorkoutLogEntry[], any>(MUTATION_URL)

  if (isLoading) {
    return <Loading />
  }

  return (
    <div className="flex flex-col gap-4">
      {data?.map((workout) => (
        <div
          key={workout._id}
          className="flex flex-col gap-4 bg-zinc-900 rounded-lg border border-transparent transition-colors border-gray-300 p-5"
        >
          <div className="flex-1 w-100%">
            {workout.props.completed ? (
              <div className="flex gap-4 text-emerald-500 font-bold">
                <CheckCircle size={24} />
                <h2>{workout.exercise.props.name}</h2>
              </div>
            ) : (
              <div className="flex justify-between font-bold">
                <h2>{workout.exercise.props.name}</h2>
                <h2>4:10</h2>
              </div>
            )}
          </div>
          {!workout.props.completed && (
            <ExerciseForm id={workout._id} mutationUrl={MUTATION_URL} />
          )}
        </div>
      ))}
    </div>
  )
}
