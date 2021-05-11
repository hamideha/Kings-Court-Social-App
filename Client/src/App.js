import { useState } from 'react'
import { withRouter } from 'react-router-dom'

import Header from './components/header/header.component'
import MessageContainer from './components/message-container/message-container.component'
import { NewMessage } from './components/buttons/buttons.components'

const App = () => {
  const [count, setCount] = useState(0)
  return (
    <div className="App">
      <Header />
      <MessageContainer />
      <NewMessage />
      <button onClick={() => { setCount(count + 1) }}>Click</button>
    </div >
  );
}

export default withRouter(App);

