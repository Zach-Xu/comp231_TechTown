const getAuthConfig = (token) => ({
    headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`
    }
})

export { getAuthConfig }