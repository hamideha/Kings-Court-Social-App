import GoogleLogin from 'react-google-login';
import { gql, useMutation } from '@apollo/client';

const AUTH_USER = gql`
  mutation authUser($accessToken: String!) {
    authUser(accessToken: $accessToken) {
      firstName
    }
  }
`;

const SignInButton = () => {
    const [authUser] = useMutation(AUTH_USER);

    const responseGoogle = (response) => {
        authUser({ variables: { accessToken: response.accessToken } })
    }

    return (
        <GoogleLogin
            clientId="192080241061-q9ih3auadn4u0v6nckcr6jfkv6kt7dr8.apps.googleusercontent.com"
            render={renderProps => (
                <button onClick={renderProps.onClick}
                    className="whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                    Login
                </button>
            )}
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
            className="absolute top-0 right-0"
        />
    )
}

export default SignInButton