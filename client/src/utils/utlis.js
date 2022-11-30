const getAuthConfig = (token) => ({
    headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`
    }
})

const getFriend = (loggedUser, users) => {
    return users[0]._id === loggedUser._id ? users[1] : users[0]
}

const isSameSender = (messages, m, i, userId) => {
    return (
        i < messages.length - 1 &&
        (messages[i + 1].sender._id !== m.sender._id ||
            messages[i + 1].sender._id === undefined) &&
        messages[i].sender._id !== userId
    );
};

const isSameUser = (messages, m, i) => {
    return i > 0 && messages[i - 1].sender._id === m.sender._id;
};

const isSameSenderMargin = (messages, m, i, userId) => {

    if (
        i < messages.length - 1 &&
        messages[i + 1].sender._id === m.sender._id &&
        messages[i].sender._id !== userId
    )
        return 33;
    else if (
        (i < messages.length - 1 &&
            messages[i + 1].sender._id !== m.sender._id &&
            messages[i].sender._id !== userId) ||
        (i === messages.length - 1 && messages[i].sender._id !== userId)
    )
        return 0;
    else return "auto";
};

export { getAuthConfig, getFriend, isSameSender, isSameUser, isSameSenderMargin }