import { ElementType } from 'react'

interface ExerciseFormProps {
  icon: ElementType
  text: string
  onClick?: () => void
  isDisabled?: boolean
}

export function ExerciseFormButton({
  icon: Icon,
  text,
  isDisabled,
  onClick,
}: ExerciseFormProps) {
  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className="flex gap-3 bg-purple-700 hover:bg-zinc-50 hover:text-zinc-950 text-white p-2 rounded-lg focus:outline-none focus:shadow-outline"
      type="submit"
    >
      <Icon size={24} />
      <h3>{text}</h3>
    </button>
  )
}
