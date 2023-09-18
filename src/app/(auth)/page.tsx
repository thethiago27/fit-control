import { SignInButton } from '@/components/SignInButton'

export default function Login() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <h1 className="text-xl">Fit Control</h1>
      <p>
        Controle o seu histórico de evolução, e tenha uma agenda de treinos.
      </p>
      <SignInButton />
    </div>
  )
}
