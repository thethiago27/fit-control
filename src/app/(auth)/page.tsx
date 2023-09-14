import { SignInButton } from '@/components/SignInButton'

export default function Login() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl">Fit Control</h1>
      <SignInButton />
    </div>
  )
}
