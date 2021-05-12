import { withRouter } from 'react-router-dom'

import Header from './components/header/header.component'
import ChatContainer from './components/chat-container/chat-container.component'
import MessageContainer from './components/message-container/message-container.component'
import { NewMessage } from './components/buttons/buttons.components'

const App = () => {
  return (
    <div className="App">
      <Header />
      <div className="h-screen flex">
        <ChatContainer />
        <MessageContainer />
        <NewMessage />
      </div>
    </div >
  );
}

export default withRouter(App);

