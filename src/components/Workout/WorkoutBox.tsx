'use client'

import { WorkoutList as WorkoutListRaw } from '@prisma/client'
import { Loader, Pause, Play } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { post } from '@/services/api'
import { WorkoutBoxButton } from '@/components/Workout/WorkoutBoxButton'
import { toast } from 'react-toastify'
import { useState } from 'react'

interface WorkoutBoxProps {
  workout: WorkoutListRaw
  isActive?: boolean
  workoutLogId?: string
}

interface StartWorkoutResponse {
  workoutLogId: string
}
export function WorkoutBox({
  workout,
  isActive,
  workoutLogId,
}: WorkoutBoxProps) {
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false)
  const handleStartWorkout = async () => {
    setIsLoading(true)
    try {
      const response = await post<StartWorkoutResponse, any>(`/workout/start`, {
        workoutListId: workout.id,
      })

      router.push(`/workout/${response.workoutLogId}`)
    } catch (e) {
      toast.error('Você já está fazendo um treino!')
      setIsLoading(false)
    }
  }

  const handleContinueWorkout = () => {
    router.push(`/workout/${workoutLogId}`)
  }

  return (
    <div
      key={workout.id}
      className="flex flex-col gap-5 bg-zinc-900 rounded-lg border border-transparent transition-colors border-gray-300 p-5"
    >
      <h2 className="font-bold">{workout.name}</h2>
      <h2>Quantidade de exercicios: {workout.exercises.length}</h2>
      {isLoading ? (
        <WorkoutBoxButton
          isLoading={isLoading}
          icon={Loader}
          text="Iniciando Treino..."
        />
      ) : (
        <WorkoutBoxButton
          onClick={isActive ? handleContinueWorkout : handleStartWorkout}
          icon={isActive ? Pause : Play}
          text={isActive ? 'Retormar Treino' : 'Iniciar'}
        />
      )}
    </div>
  )
}
