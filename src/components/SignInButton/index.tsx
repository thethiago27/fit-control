'use client'

import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { firebaseAuth } from '@/services/firebase'
import { post } from '@/services/api'

interface AuthResponse {
  token: string
}

interface AuthRequestBody {
  uid: string
  email: string
  photoUrl: string
  name: string
}
export function SignInButton() {
  const router = useRouter()
  const handleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(firebaseAuth, provider)

      if (!result.user.email)
        return toast.error(`A sua conta não possui um email`)

      const { uid, displayName, photoURL, email } = result.user

      await post<AuthResponse, AuthRequestBody>('/auth', {
        uid,
        email,
        name: displayName || email,
        photoUrl: photoURL || '',
      })

      // await createToken(reponse.token)

      router.push(`/workout`)
    } catch (e) {
      toast.error(`Erro ao fazer login`)
    }
  }

  return (
    <button className="bg-purple-700 p-4 rounded" onClick={handleSignIn}>
      Login With Google
    </button>
  )
}
