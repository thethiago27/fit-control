import { ElementType, useState } from 'react'
import { motion, useAnimation } from 'framer-motion'

interface WorkoutBoxButtonProps {
  onClick?: () => void
  icon: ElementType
  text: string
  isLoading?: boolean
}

export function WorkoutBoxButton({
  icon: Icon,
  text,
  onClick,
  isLoading,
}: WorkoutBoxButtonProps) {
  const [loading, setLoading] = useState(isLoading || false)
  const controls = useAnimation()

  const handleClick = async () => {
    if (onClick && !loading) {
      setLoading(true)
      onClick()
      setLoading(false)
    }
  }

  const spinnerVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  }

  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      className="bg-purple-700 p-3 rounded flex justify-center items-center gap-4"
    >
      {loading ? (
        <motion.span
          className="w-5 h-5 border-t-2 border-r-2 border-b-2 border-purple-200 rounded-full animate-spin"
          variants={spinnerVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.5, loop: Infinity }}
        />
      ) : (
        <span>
          <Icon size={20} />
        </span>
      )}
      {text}
    </button>
  )
}
