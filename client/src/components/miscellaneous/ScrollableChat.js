import React from 'react'
import { GlobalState } from '../../context/GlobalProvider'
import { isSameSenderMargin, isSameUser } from '../../utils/utlis'

export default function ScrollableChat({ messages }) {

    const { user } = GlobalState()

    return (
        <div style={{ overflowX: "hidden", overflowY: "auto" }}>
            {
                messages && messages.map((msg, i) => (
                    <div style={{ display: "flex" }} key={msg._id}>
                        <span
                            style={{
                                backgroundColor: `${msg.sender._id === user._id ? "#BEE3F8" : "#B9F5D0"
                                    }`,
                                marginLeft: isSameSenderMargin(messages, msg, i, user._id),
                                marginTop: isSameUser(messages, msg, i, user._id) ? 3 : 10,
                                borderRadius: "20px",
                                padding: "5px 15px",
                                maxWidth: "75%",
                            }}
                        >
                            {msg.content}
                        </span>
                    </div>
                ))
            }
        </div>
    )
}
