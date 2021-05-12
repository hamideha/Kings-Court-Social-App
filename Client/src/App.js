import { withRouter } from 'react-router-dom'

import Header from './components/header/header.component'
import ChatContainer from './components/chat-container/chat-container.component'
import MessageContainer from './components/message-container/message-container.component'
import { NewMessage } from './components/buttons/buttons.components'

const App = () => {
  return (
    <div className="App h-screen flex flex-col overflow-hidden">
      <Header />
      <div className="flex-1 flex overflow-hidden">
        <ChatContainer />
        <MessageContainer />
        <NewMessage />
      </div>
    </div >
  );
}

export default withRouter(App);

