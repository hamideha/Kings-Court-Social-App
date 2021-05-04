import { useQuery } from 'react-query'
import axios from 'axios'

const App = () => {

  const { isLoading, data } = useQuery('api', () =>
    axios.get('/api')
      .then((response) => response)
  )
  console.log(data, isLoading)

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
