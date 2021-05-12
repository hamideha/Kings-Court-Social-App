// import { useEffect, useState } from 'react'
import { Context } from '../store/store'
import { useQuery, useMutation } from '@apollo/client';
import { AUTH_USER, LOGOUT_USER } from '../queries/auth.queries'

const useAuth = () => {
  const [authUser, { data, loading, error, called }] = useMutation(AUTH_USER);
  return { authUser, data, loading, error, called }
}

export const useLogout = () => {
  const [logoutUser, { data, loading, error, called, client }] = useMutation(LOGOUT_USER);
  return { logoutUser, data, loading, error, called, client }
}

export default useAuth