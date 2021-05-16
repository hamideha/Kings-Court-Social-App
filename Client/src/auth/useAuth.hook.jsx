import { useQuery, useMutation } from '@apollo/client';
import { AUTH_USER, LOGOUT_USER } from '../queries/auth.queries'
import { useStore } from '../store/global-store'

const useAuth = () => {
  const [authUser, { data, loading, error, called }] = useMutation(AUTH_USER);
  const { setUserOnLogin } = useStore()

  const authenticate = async (vars) => {
    const { data } = await authUser(vars)
    setUserOnLogin(data)
  }

  return { authenticate, data, loading, error, called }
}

export const useLogout = () => {
  const [logoutUser, { data, loading, error, called, client }] = useMutation(LOGOUT_USER);
  const { setUserOnLogout } = useStore()

  const logout = () => {
    logoutUser().then(() => { client.resetStore(); setUserOnLogout() })
  }

  return { logout, data, loading, error, called, client }
}

export default useAuth