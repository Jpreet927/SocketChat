import React, { useEffect, useState } from 'react';
import '../styles/Messaging.css';
import { ChatState } from '../context/ChatProvider';
import { retrieveSender } from '../config/Helpers';
import axios from 'axios'

import { Avatar, IconButton } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import SearchIcon from '@mui/icons-material/Search';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import MessagingBody from './MessagingBody';

function Messaging() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState();
  const {user, selectedChat, setSelectedChat} = ChatState();

  const sendMessage = async (e) => {
    e.preventDefault();
    //e.key === "Enter" && 
    if (newMessage) {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };

        setNewMessage("");

        const { data } = await axios.post('/api/messages', {
          msgContent: newMessage,
          threadId: selectedChat._id,
        }, config);

        setMessages([...messages, data]);
        console.log(data);

      } catch (error) {
        
      }
    }
  }

  const fetchAllMessages = async () => {
    if (!selectedChat) return;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(`/api/messages/${selectedChat._id}`, config);
      console.log(messages);
      setMessages(data);
    } catch (error) {
      
    }
  }

  useEffect(() => {
    fetchAllMessages();
  }, [selectedChat])

  const typingHandler = (e) => {
    setNewMessage(e.target.value);
    console.log(newMessage);
    //typing indicator
  }

  return (
    selectedChat ? (
    <div className='messaging'>
        <div className="messaging-header">
          <Avatar sx={{ width: 50, height: 50 }}/>
          <div className="header-details">
            <h3>{ !selectedChat.isGroup ? retrieveSender(user, selectedChat.users) : selectedChat.threadName }</h3>
            <p>Last seen at 12:20 pm</p>
          </div>
          <div className="header-icons">
            <IconButton>
              <SearchIcon />
            </IconButton>
            <IconButton>
              <SettingsIcon />
            </IconButton>
          </div>
        </div>

        {/* <div className="messaging-body">
            <p className="message-receive message-sent">
              <span className='receive-name'>fdsafdsa</span>
              fdsafdsafdsa
              <span className='receive-time'>
                February 22nd, 2022
              </span>
            </p>
        </div> */}
        <div className='messaging-body-container'>
          <MessagingBody messages={messages} />
        </div>

        <div className="message-input">
          <EmojiEmotionsIcon />
          <form className='message-input-form' onSubmit={sendMessage}>
            <input 
              value=""  
              type="text" 
              placeholder='Send a message!'
              onChange={typingHandler}
              value={newMessage}
            />
            <button type="submit">Send</button>
          </form>
        </div>
    </div>
  ) : null)
}

export default Messaging