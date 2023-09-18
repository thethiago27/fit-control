'use client'

import { get } from '@/services/api'
import {
  WorkoutList as WorkoutListRaw,
  Exercise as ExerciseRaw,
} from '@prisma/client'
import { useParams } from 'next/navigation'
import { Dumbbell } from 'lucide-react'

type WorkoutListProps = WorkoutListRaw & {
  exerciseList: ExerciseRaw[]
}

async function getExercises(slug: string): Promise<WorkoutListProps> {
  return await get<WorkoutListProps>(`/workout/${slug}/details`)
}

export default async function Exercises() {
  const params = useParams()

  const { slug } = params
  const { name, exerciseList } = await getExercises(String(slug))

  return (
    <div className="flex flex-col p-4 gap-4">
      <div className="flex gap-4 py-4 items-center">
        <Dumbbell size={20} />
        {name}
      </div>
      {exerciseList.map((exercise) => (
        <div
          key={exercise.id}
          className="flex flex-col gap-7 bg-zinc-900 rounded-lg border border-transparent transition-colors border-gray-300 p-5"
        >
          <h2>{exercise.name}</h2>
        </div>
      ))}
    </div>
  )
}
