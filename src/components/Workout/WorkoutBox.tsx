import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Eye, Loader, Pause, Play } from 'lucide-react'
import { WorkoutList as WorkoutListRaw } from '@prisma/client'
import { post } from '@/services/api'
import { WorkoutBoxButton } from '@/components/Workout/WorkoutBoxButton'
import { toast } from 'react-toastify'

interface WorkoutBoxProps {
  workout: {
    _id: string
    props: WorkoutListRaw
  }
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
      const response = await post<StartWorkoutResponse, any>(
        '/user-workout/start',
        {
          workoutListId: workout._id,
        },
      )
      router.push(`/workout/${response.workoutLogId}`)
    } catch (e) {
      toast.error('Você já está fazendo um treino!')
      setIsLoading(false)
    }
  }

  const handleContinueWorkout = () => {
    router.push(`/workout/${workoutLogId}`)
  }

  const handleViewExercises = () => {
    router.push(`/exercises/${workout._id}`)
  }

  return (
    <div
      key={workout._id}
      className="flex flex-col gap-7 bg-zinc-900 rounded-lg border border-transparent transition-colors border-gray-300 p-5"
    >
      <div className="flex flex-row items-center justify-between">
        <h2 className="font-bold">{workout.props.name}</h2>
        <button
          onClick={handleViewExercises}
          className="rounded p-2 bg-purple-700"
        >
          <Eye size={16} />
        </button>
      </div>
      <h2>Quantidade de exercícios: {workout.props.exercises.length}</h2>
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
          text={isActive ? 'Retomar Treino' : 'Iniciar'}
        />
      )}
    </div>
  )
}
