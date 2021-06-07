import ChatContainer from '../../components/chat-container/chat-container.component'
import MessageContainer from '../../components/message-container/message-container.component'

const Home = () => {
    return (
        <div className="flex-1 flex overflow-hidden">
            <ChatContainer />
            <MessageContainer />
        </div>
    )
}

export default Home