import React, { useEffect, useState } from 'react'
import '../styles/SidebarThread.css'
import { Avatar } from '@mui/material'
import { ChatState } from '../context/ChatProvider'
import { retrieveSender } from '../config/Helpers'
import axios from 'axios';

function SidebarThread() {
  const [currUser, setCurrUser] = useState();
  const { user, selectedChat, setSelectedChat, chats, setChats } = ChatState();

  const retrieveChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get('/api/threads', config);
      console.log(data);
      setChats(data);
    } catch (error) {
      console.log("retrieve chats didn't work");
    }
  }

  useEffect(() => {
    setCurrUser(JSON.parse(localStorage.getItem("userInfo")));
    retrieveChats();
  }, []);

  return (
    chats ? 
      chats.map((chat) => (
        <div className='sidebar-thread' key={chat._id} onClick={() => setSelectedChat(chat)}>
          <Avatar />
          <div className="thread-details">
              <h3>{!chat.isGroup ? retrieveSender(currUser, chat.users) : (chat.threadName)}</h3>

              <p>Latest Message.</p>
          </div>
        </div>
      ))
    : <div></div>
  )
}

export default SidebarThread