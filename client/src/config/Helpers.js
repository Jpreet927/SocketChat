const retrieveSender = (currUser, allUsers) => {
    // return users[0]._id === currUser._id ? users[1] : users[0];
    if (allUsers[0] === currUser._id) {
        return allUsers[1].name
    } else {
        return allUsers[1].name
    }
}

// const isSameSender = (messages, message, index, userId) => {
//     return (
//       //fdsa  
//     );
// }

export { retrieveSender }