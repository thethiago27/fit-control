'use client'

import { ExerciseFormButton } from '@/components/ExerciseForm/ExerciseFormButton'
import { Check } from 'lucide-react'
import { useGetExercises } from '@/lib/exercise'
import { FormEvent } from 'react'

export function AddExerciseForm() {
  const { mutate, data } = useGetExercises()

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    mutate({ ...data, id: 'aaaaa', name: 'dddd', series: '1', reps: '1' })
  }

  return (
    <div className="flex flex-col gap-4 border-b-2 border-zinc-900 py-10">
      <p>Add New Exercise</p>
      <div className="flex flex-col gap-4 bg-zinc-900 rounded-lg border border-transparent transition-colors border-gray-300 p-5">
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <div className="flex justify-between gap-2">
            <div className="mb-4 flex flex-col gap-2">
              <label className="block text-sm mb-2" htmlFor="envName">
                Exercise
              </label>
              <input
                className="shadow appearance-none rounded w-full py-3 px-4 bg-zinc-950 leading-tight focus:outline-none focus:shadow-outline"
                id="Nome"
                type="text"
              />
            </div>
            <div className="mb-4 flex flex-col gap-2">
              <label className="block text-sm mb-2" htmlFor="envName">
                Series
              </label>
              <input
                className="shadow appearance-none rounded w-full py-3 px-4 bg-zinc-950 leading-tight focus:outline-none focus:shadow-outline"
                id="envName"
                type="text"
              />
            </div>
            <div className="mb-4 flex flex-col gap-2">
              <label className="block text-sm mb-2" htmlFor="envName">
                Reps
              </label>
              <input
                className="shadow appearance-none rounded w-full py-3 px-4 bg-zinc-950 leading-tight focus:outline-none focus:shadow-outline"
                id="envName"
                type="text"
              />
            </div>
          </div>
          <ExerciseFormButton
            icon={Check}
            text={'Concluir'}
            isDisabled={false}
          />
        </form>
      </div>
    </div>
  )
}
