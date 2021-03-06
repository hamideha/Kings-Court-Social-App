import { useGoogleLogout, useGoogleLogin } from 'react-google-login';

import useAuth, { useLogout } from '../auth/useAuth.hook'

export const SignInButton = () => {
  const { authenticate } = useAuth();

  const onSuccess = async (response) => {
    authenticate({ variables: { accessToken: response.accessToken } })
  }

  const onFailure = () => {
    console.log('Failed to Login')
  }

  const { signIn } = useGoogleLogin({
    onSuccess,
    onFailure,
    approvalPrompt: 'force',
    prompt: 'consent',
    clientId: "192080241061-q9ih3auadn4u0v6nckcr6jfkv6kt7dr8.apps.googleusercontent.com",
    isSignedIn: true
  });

  return (
    <button onClick={signIn}
      className="px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">
      Login
    </button>
  )
}


export const SignOutButton = ({ className }) => {
  const { logout } = useLogout()

  const onLogoutSuccess = () => {
    logout()
  }

  const onFailure = () => {
    console.log('Failed to Logout')
  }

  const { signOut } = useGoogleLogout({
    clientId: "192080241061-q9ih3auadn4u0v6nckcr6jfkv6kt7dr8.apps.googleusercontent.com",
    onLogoutSuccess,
    onFailure,
  });

  return (
    <button onClick={signOut}
      className={className}>
      Logout
    </button>
  )
}