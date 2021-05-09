import { gql, useQuery } from '@apollo/client';

import Header from './components/header/header.component'

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

const App = () => {
  // const { loading, error, data } = useQuery(GET_MESSAGES);

  return (
    <div className="App">
      <Header />
    </div>
  );
}

export default App;
