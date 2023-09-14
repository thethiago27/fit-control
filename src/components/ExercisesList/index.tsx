'use client'

import { Exercise as ExerciseRaw } from '@prisma/client'
import { useParams } from 'next/navigation'
import { CheckCircle } from '@phosphor-icons/react'
import { useFetch } from '@/services/useFetcher'
import { ExerciseForm } from '@/components/ExerciseForm'

interface WorkoutLogEntry {
  id: string
  workoutLogId: string
  exerciseId: string
  completed: boolean
  createdAt: string
  updatedAt: string
  userId: string
  isCurrent: boolean
  exercise: ExerciseRaw
}

export function ExercisesList() {
  const { slug } = useParams()

  const MUTATION_URL = `/user-workout/${slug}/exercises`

  const { data, isLoading } = useFetch<WorkoutLogEntry[], any>(MUTATION_URL)

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
    <div className="flex flex-col gap-4">
      {data?.map((workout) => (
        <div
          key={workout.id}
          className="flex flex-col gap-4 bg-zinc-900 rounded-lg border border-transparent transition-colors border-gray-300 p-5"
        >
          <div className="flex-1 w-100%">
            {workout.completed ? (
              <div className="flex gap-4 text-emerald-500 font-bold">
                <CheckCircle size={24} />
                <h2>{workout.exercise.name}</h2>
              </div>
            ) : (
              <div className="flex justify-between font-bold">
                <h2>{workout.exercise.name}</h2>
                <h2>4:10</h2>
              </div>
            )}
          </div>
          {!workout.completed && (
            <ExerciseForm id={workout.id} mutationUrl={MUTATION_URL} />
          )}
        </div>
      ))}
    </div>
  )
}
