import { gql } from '@apollo/client';

export const AUTH_USER = gql`
mutation authUser($accessToken: String!) {
  authUser(accessToken: $accessToken) {
    id
    firstName
    lastName
    email
    profilePicture
  }
}
`;

export const LOGOUT_USER = gql`
mutation logoutUser {
  logoutUser
}
`;

export const GET_AUTH = gql`
query isAuthed {
  isAuthed {
    isLoggedIn
    user {
      id
      firstName
      lastName
      email
      profilePicture
    }
  }
}
`;