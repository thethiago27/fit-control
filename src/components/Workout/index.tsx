import { WorkoutList } from '@/components/Workout/WorkoutList'
import { Dumbbell } from 'lucide-react'

export default async function SeriesList() {
  return (
    <div className="flex flex-col p-4 gap-4">
      <div className="flex gap-4 py-4 items-center">
        <Dumbbell size={20} strokeWidth={1.25} />
        Novo Treino{' '}
      </div>
      <WorkoutList />
    </div>
  )
}
