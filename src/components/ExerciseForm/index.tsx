'use client'

import { useSWRConfig } from 'swr'
import { useState } from 'react'
import { post } from '@/services/api'
import { Checks, Spinner } from '@phosphor-icons/react'
import { useForm } from 'react-hook-form'
import { ExerciseFormButton } from '@/components/ExerciseForm/ExerciseFormButton'

interface ExerciseFormData {
  weight: string
  performance: number
}

interface ExerciseProps {
  id: string
  mutationUrl: string
}

export function ExerciseForm({ id, mutationUrl }: ExerciseProps) {
  const { mutate } = useSWRConfig()

  const { handleSubmit, register } = useForm<ExerciseFormData>()
  const [loading, setLoading] = useState(false)

  const handleUserConclusion = async (
    data: ExerciseFormData,
    workoutId: string,
  ) => {
    setLoading(true)
    try {
      await post(`user-workout/${workoutId}/complete`, {
        weight: data.weight,
        performance: data.performance,
      })
      await mutate(mutationUrl)
      setLoading(false)
    } catch (e) {
      alert('erro ao atualizar dados')
    }
  }

  return (
    <form
      onSubmit={handleSubmit((data) => handleUserConclusion(data, id))}
      className="flex py-4 flex-col gap-4"
    >
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-4">
          <h3>Carga (Kg)</h3>
          <input
            {...register('weight')}
            placeholder="0"
            className="bg-zinc-950 p-2 rounded focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex flex-col gap-4">
          <h3>Esforço</h3>
          <select
            {...register('performance')}
            className="bg-zinc-950 p-2 rounded focus:outline-none focus:shadow-outline"
          >
            <option value="LIGHT">Leve</option>
            <option value="HEAVY">Pesado</option>
            <option value="BRUTAL">Brutal</option>
          </select>
        </div>
      </div>
      <div className="flex justify-between items-end">
        <p></p>
        <ExerciseFormButton
          icon={loading ? Spinner : Checks}
          text={loading ? 'Salvando...' : 'Concluir'}
          isDisabled={loading}
        />
      </div>
    </form>
  )
}
