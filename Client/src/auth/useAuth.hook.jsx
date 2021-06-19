import { useQuery, useMutation } from '@apollo/client';
import { AUTH_USER, LOGOUT_USER, GET_AUTH } from '../queries/auth.queries'
import { useStore } from '../store/global-store'

export const useIsAuthed = () => {
  const { data, loading, error } = useQuery(GET_AUTH);

  return { data, loading, error }
}

const useAuth = () => {
  const [authUser, { data, loading, error, called }] = useMutation(AUTH_USER);
  const { setCurrentUser } = useStore()

  const authenticate = async (vars) => {
    const { data } = await authUser(vars)
    setCurrentUser(data.authUser)
  }

  return { authenticate, data, loading, error, called }
}

export const useLogout = () => {
  const [logoutUser, { data, loading, error, called, client }] = useMutation(LOGOUT_USER);
  const { setCurrentUser } = useStore()

  const logout = () => {
    logoutUser().then(() => { client.resetStore(); setCurrentUser() })
  }

  return { logout, data, loading, error, called, client }
}

export default useAuth