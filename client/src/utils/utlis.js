const getAuthConfig = (token) => ({
    headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`
    }
})

const getFriend = (loggedUser, users) => {
    return users[0]._id === loggedUser._id ? users[1] : users[0]
}


export { getAuthConfig, getFriend }