import { useState } from 'react'

import Header from './components/header/header.component'
import MessageContainer from './components/message-container/message-container.component'

const App = () => {
  const [count, setCount] = useState(0)
  return (
    <div className="App">
      <Header />
      <MessageContainer />
      <button onClick={() => { setCount(count + 1) }}>Click</button>
    </div >
  );
}

export default App;
