// import { useEffect, useState } from 'react'
import { Context } from '../store/store'
import { gql, useQuery, useMutation } from '@apollo/client';

// const GET_AUTH = gql`
//   query isAuthed {
//     isAuthed{
//       firstName
//       lastName
//       email
//       profilePicture
//       messages {
//           content
//           likes
//         }
//       }
//     }
// `;

const AUTH_USER = gql`
mutation authUser($accessToken: String!) {
  authUser(accessToken: $accessToken) {
    firstName
    lastName
    email
    profilePicture
    messages {
      content
      likes
    }
  }
}
`;

const LOGOUT_USER = gql`
mutation logoutUser {
  logoutUser
}
`;

const useAuth = () => {
  const [authUser, { data, loading, error, called }] = useMutation(AUTH_USER);
  return { authUser, data, loading, error, called }
}

export const useLogout = () => {
  const [logoutUser, { data, loading, error, called, client }] = useMutation(LOGOUT_USER);
  return { logoutUser, data, loading, error, called, client }
}

export default useAuth