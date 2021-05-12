import { gql } from '@apollo/client';

export const AUTH_USER = gql`
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

export const LOGOUT_USER = gql`
mutation logoutUser {
  logoutUser
}
`;

export const GET_AUTH = gql`
  query isAuthed {
    isAuthed{
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