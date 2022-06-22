import React from 'react'
import '../styles/SelectedUserToAdd.css'
import CloseIcon from '@mui/icons-material/Close'

function SelectedUserToAdd({user, handleFunction}) {
  return (
    <div className='selected-user'>
        <p>{user.name}</p>
        <CloseIcon onClick={handleFunction} />
    </div>
  )
}

export default SelectedUserToAdd