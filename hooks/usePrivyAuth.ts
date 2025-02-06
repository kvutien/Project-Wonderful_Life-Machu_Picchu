import { useLogin, useLogout, usePrivy } from '@privy-io/react-auth'
import { useRouter } from 'next/navigation'

export function usePrivyAuth() {
  const router = useRouter()
  const { ready, authenticated, user } = usePrivy()

  const { login } = useLogin({
    onComplete: ({ user, isNewUser, wasAlreadyAuthenticated }) => {
      console.log('Login successful:', { user, isNewUser, wasAlreadyAuthenticated })
      router.refresh()
    },
    onError: (error) => {
      console.error('Login error:', error)
    },
  })

  const { logout: privyLogout } = useLogout({
    onSuccess: () => {
      console.log('Logout successful')
      router.refresh()
    },
  })

  return {
    ready,
    authenticated,
    user,
    login,
    logout: privyLogout,
  }
} 