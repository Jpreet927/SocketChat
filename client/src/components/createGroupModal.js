import React, { useState } from 'react'
import '../styles/createGroupModal.css'
import CloseIcon from '@mui/icons-material/Close'
import { ChatState } from '../context/ChatProvider'
import axios from 'axios'
import UserSearchResult from './UserSearchResult'
import SelectedUserToAdd from './SelectedUserToAdd'

function CreateGroupModal({closeModal}) {
    const [groupChatName, setGroupChatName] = useState();
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const { user, chats, setChats } = ChatState();

    const handleSearch = async (query) => {
        setSearch(query);
        if (!query) {
            return
        }

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            };
            const { data } = await axios.get(`/api/user?search=${search}`, config)
            setSearchResult(data);
            console.log(data);
        } catch (error) {
            console.log(`Failed to load users to add, error: ${error}`);
        }
    }

    const handleSubmit = async () => {
        if(!groupChatName || !selectedUsers) {
            return;
        }

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            };
            const {data} = await axios.post("/api/threads/group", {
                name:groupChatName,
                users:JSON.stringify(selectedUsers.map((user) => user._id)),
            }, config);
            setChats([data, ...chats]);
            closeModal(false);
            console.log("group chat successfully created");
        } catch (error) {
            console.log(`group chat could not be created, Error: ${error}`);
        }
    }

    const handleGroup = (userToAdd) => {
        if(selectedUsers.includes(userToAdd)) {
            console.log("user already added");
            return
        } 

        setSelectedUsers([...selectedUsers, userToAdd]);
    }

    const handleDelete = (userToDel) => {
        setSelectedUsers(
            selectedUsers.filter(select => select._id !== userToDel._id)
        );
    };

  return (
    <div className='create-group-modal'>
        <div className="modal-container">
            <form action="">
                <div className="group-header">
                    <h1>Create a New Group</h1>
                    <CloseIcon onClick={() => closeModal(false)} />
                </div>
                <input 
                    type="text" 
                    placeholder='Group Name' 
                    onChange={(e) => setGroupChatName(e.target.value)} 
                />
                <input 
                    type="text" 
                    placeholder='Add Members' 
                    onChange={(e) => handleSearch(e.target.value)} 
                />
                <div className="selected-users-to-add">
                    {selectedUsers.map((user) => (
                        <SelectedUserToAdd
                            key={user._id}
                            user={user}
                            handleFunction={() => handleDelete(user)}
                        />
                    ))}
                </div>
                <div className="search-results">
                    { searchResult?.slice(0, 4).map((user) => (
                        <UserSearchResult 
                            key={user._id}
                            user={user}
                            handleFunction={() => handleGroup(user)}
                        />
                    ))}
                </div>
                <button onClick={handleSubmit}>Create Group</button>
            </form>
        </div>
    </div>
  )
}

export default CreateGroupModal