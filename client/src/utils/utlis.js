const getAuthConfig = (token) => ({
    headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`
    }
})

const getFriend = (loggedUser, users) => {
    return users[0]._id === loggedUser._id ? users[1] : users[0]
}

const isSanderMargin = (message, userId) => {
    if (userId === message.sender._id) {
        return 'auto';
    }
    return 10;
}

export { getAuthConfig, getFriend, isSanderMargin }