import { ExerciseBox } from '@/components/Exercises/ExerciseBox'
import { Metadata } from 'next'
import { AddExerciseForm } from '@/components/Exercises/AddExerciseForm'

export const metadata: Metadata = {
  title: 'Fit Control | Admin',
  description: 'Monitor your workouts and track your progress.',
}
export default function AdminExercises() {
  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-6 px-4">
      <AddExerciseForm />
      <ExerciseBox />
    </div>
  )
}
