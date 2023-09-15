import SeriesList from '@/components/Workout'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Fit Control',
  description: 'Monitor your workouts and track your progress.',
}
export default function Home() {
  return (
    <div className="flex flex-col p-4 gap-4">
      <SeriesList />
    </div>
  )
}
