import useSWR from 'swr'
import { get } from '@/services/api'

interface ExerciseProps {
  id: string
  name: string
  sets: number
  reps: number
  slug: string
}

interface ExerciseErrorProps {
  error: string
}

export function useGetExercises() {
  const { data, error, mutate, isLoading } = useSWR<
    ExerciseProps[],
    ExerciseErrorProps
  >('/exercises', async (url) => {
    return await get(url)
  })

  return { data, error, isLoading, mutate }
}

export function useGetExerciesByWorkoutList(slug: string) {
  const { data, error, mutate, isLoading } = useSWR<
    ExerciseProps[],
    ExerciseErrorProps
  >(`/workout/${slug}`, async (url) => {
    return await get(url)
  })

  return { data, error, isLoading, mutate }
}
