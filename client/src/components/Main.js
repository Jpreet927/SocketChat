import React, { useEffect, useState } from 'react'
import { ChatState } from '../context/ChatProvider'
import '../styles/Main.css'
import Sidebar from './Sidebar'
import Messaging from './Messaging'
import axios from 'axios'

function Main() {
  // const { user } = ChatState();

  const getThreads = async () => {
    const {data} = await axios.get('/api/threads');
    console.log(data);
  }

  useEffect(() => {
    getThreads();
  }, [])
  
  return (
    <div className="Main">
      <div className='main-body'>
        <Sidebar />
        <Messaging/>
      </div>
    </div>
  );
}

export default Main;
