import React from 'react'
import { ChatState } from "../context/ChatProvider"
import { Avatar, IconButton } from '@mui/material';


import '../styles/UserSearchResult.css'

function UserSearchResult({ user, handleFunction }) {
  return (
    <div className='user-search-container'>
      <div className="user-search-result" onClick={handleFunction}>
          <Avatar sx={{ width: 40, height: 40 }} />
          <div className="search-result">
              <h3>{(user) ? user.name : "Name"}</h3>
          </div>
      </div>
    </div>
  )
}

export default UserSearchResult