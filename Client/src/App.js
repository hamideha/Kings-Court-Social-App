import GoogleLogin from 'react-google-login';

import { gql, useQuery, useMutation } from '@apollo/client';

const GET_MESSAGES = gql`
  query Messages {
    Messages{
      content
      user {
        email
        firstName
        lastName
      }
    }
  }
`;

const AUTH_USER = gql`
  mutation authUser($accessToken: String!) {
    authUser(accessToken: $accessToken) {
      firstName
    }
  }
`;


const App = () => {
  // const { loading, error, data } = useQuery(GET_MESSAGES);
  const [authUser] = useMutation(AUTH_USER);

  const responseGoogle = (response) => {
    authUser({ variables: { accessToken: response.accessToken } })
  }

  return (
    <div className="App">
      <GoogleLogin
        clientId="192080241061-q9ih3auadn4u0v6nckcr6jfkv6kt7dr8.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
        className="absolute top-0 right-0"
      />
    </div>
  );
}

export default App;
