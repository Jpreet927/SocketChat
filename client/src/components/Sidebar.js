import React, { useState } from 'react';
import { ChatState } from '../context/ChatProvider';
import { useHistory } from 'react-router-dom';
import axios from 'axios'
import '../styles/Sidebar.css'
import UserSearchResult from './UserSearchResult';

import SidebarThread from './SidebarThread';
import { Avatar } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import CreateGroupModal from './createGroupModal';


function Sidebar() {
  const [showResults, setShowResults] = useState(false);
  const [showCloseIcon, setShowCloseIcon] = useState(false);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const { user, setSelectedChat, chats, setChats } = ChatState();
  const history = useHistory();

  const handleShowResults = () => {
    setShowResults(true);
    setShowCloseIcon(true);
  }

  const handleCloseIcon = () => {
    setShowResults(false);
    setShowCloseIcon(false);
    setSearch("");
  }

  const handleSearch = async () => {
    if (!search) {
      return
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`
        },
      };

      const { data } = await axios.get(`/api/user?search=${search}`, config);
      setSearchResult(data);

    } catch (error) {
      console.log("Search results did not load")
    }
  }

  const openThread = async (userId) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`
        },
      };

      const {data} = await axios.post('/api/threads', {userId}, config);
      if (!chats.find((chat) => chat._id === data._id)) {
        setChats([data, ...chats])
      }
      setSelectedChat(data);

    } catch (error) {
      
    }
  }

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    history.push("/");
  }

  return (
    <div className="sidebar-container">
      <div className='sidebar'>
        <div className="header">
          <div className="profile-picture">
            <Avatar
              sx={{ width: 50, height: 50 }}
            />
          </div>
          <div className="profile-name">
            <h3>{(user) ? user.name : "Name"}</h3>
            <SettingsIcon onClick={logoutHandler} />
          </div>
        </div>

        <div className="search">
          <div className="search-container">
            <SearchIcon onClick={handleSearch} />
            <input 
              type="text" 
              placeholder='Search for a thread' 
              onClick={handleShowResults}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              required
            />
            { showCloseIcon ? <CloseIcon onClick={handleCloseIcon} /> : null}
            
          </div>
          { showResults ? 
            <div className="search-results">
              { searchResult.map((user) => (
                <UserSearchResult 
                  key={user._id}
                  user={user}
                  handleFunction={() => openThread(user._id)}
                /> 
              ))}
            </div>
          : null }
        </div>

        <div className="threads">
          <SidebarThread />
        </div>

        <div className="create-group-btn">
          <button onClick={() => setOpenModal(true)} >
            <AddIcon />
            Create a New Group
          </button>
        </div>
      </div>
      { openModal && <CreateGroupModal closeModal={setOpenModal} />}
    </div>
  )
}

export default Sidebar