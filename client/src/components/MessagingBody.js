import React from 'react'
import ScrollableFeed from 'react-scrollable-feed'
import { ChatState } from '../context/ChatProvider'
import '../styles/MessagingBody.css'

function MessagingBody({ messages }) {
    const { user } = ChatState();

    return (
        <div className="messaging-body">
            {/* <ScrollableFeed> */}
                { messages && messages.map((m, i) => (
                    <p className={`message-receive ${ m.sender._id === user._id ?"message-sent" : ""}`}>
                        <span className='receive-name'>{m.sender.name}</span>
                        <p>{m.content}</p>
                        <span className='receive-time'>
                            February 22nd, 2022
                        </span>
                    </p> 
                ))}
            {/* </ScrollableFeed> */}
        </div>
    )
}

export default MessagingBody