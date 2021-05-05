// import FacebookLogin from 'react-facebook-login';

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

  return (
    <div className="App">
      {/* <FacebookLogin
        appId="532721914385485"
        autoLoad={true}
        fields="name,email,picture"
        callback={(res) => console.log(res)}
      /> */}
    </div>
  );
}

export default App;
