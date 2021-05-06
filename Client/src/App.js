import GoogleLogin from 'react-google-login';

// import { gql, useQuery } from '@apollo/client';

// const GET_MESSAGES = gql`
//   query Messages {
//     Messages{
//       content
//       user {
//         email
//         firstName
//         lastName
//       }
//     }
//   }
// `;

const App = () => {
  // const { loading, error, data } = useQuery(GET_MESSAGES);
  // console.log(loading, error, data)
  const responseGoogle = (response) => {
    console.log(response);
  }

  return (
    <div className="App">
      <GoogleLogin
        clientId="192080241061-q9ih3auadn4u0v6nckcr6jfkv6kt7dr8.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      />
    </div>
  );
}

export default App;
