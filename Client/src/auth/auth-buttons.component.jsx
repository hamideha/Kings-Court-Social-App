import GoogleLogin, { GoogleLogout } from 'react-google-login';
import useAuth, { useLogout } from '../auth/useAuth.hook'

export const SignInButton = ({ refetch }) => {
  const { loading, error, data, authUser } = useAuth();
  console.log(data)

  const responseGoogle = (response) => {
    authUser({ variables: { accessToken: response.accessToken } })
  }

  return (
    <GoogleLogin
      clientId="192080241061-q9ih3auadn4u0v6nckcr6jfkv6kt7dr8.apps.googleusercontent.com"
      render={renderProps => (
        <button onClick={renderProps.onClick}
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">
          Login
        </button>
      )}
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy={'single_host_origin'}
    />
  )
}


export const SignOutButton = ({ refetch }) => {
  const { loading, error, data, logoutUser, client } = useLogout();

  const logout = () => {
    logoutUser().then(() => client.resetStore())
  }

  return (
    <GoogleLogout
      clientId="192080241061-q9ih3auadn4u0v6nckcr6jfkv6kt7dr8.apps.googleusercontent.com"
      buttonText="Logout"
      render={renderProps => (
        <button onClick={renderProps.onClick}
          className="whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">
          Logout
        </button>
      )}
      onLogoutSuccess={logout}
    >
    </GoogleLogout>
  )
}