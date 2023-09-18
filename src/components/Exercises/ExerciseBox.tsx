'use client'

import { useGetExercises } from '@/lib/exercise'

export function ExerciseBox() {
  const { data } = useGetExercises()

  return (
    <div className="flex flex-col gap-6">
      {data?.map((exercise) => (
        <div
          key={exercise.id}
          className="flex flex-col gap-7 bg-zinc-900 rounded-lg border border-transparent transition-colors border-gray-300 p-5"
        >
          <p>{exercise.name}</p>
        </div>
      ))}
    </div>
  )
}
